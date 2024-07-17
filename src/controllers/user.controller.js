import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import {
  uploadOnCloudinary,
} from "../utils/Cloudinary.js";
import jwt from "jsonwebtoken"; 

const generateAccessAndRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validationBeforeSve : false});

        return {accessToken , refreshToken}
    } catch (error) {
        throw new ApiError(500 , 
            "something went wrong while making tokens "
        )
    }
}

const registerUser = asyncHandler( async(req , res) => {
    // get details from the user 
    const { username , fullName , email , password } = req.body;


    //validation 
    if ( 
        [fullName , username , email , password ].some((field)=>field?.trim()==="")
    ){
        throw new ApiError( 400 , "all fields are required ")
    }

    // check if user already exists 
     const existedUser = await User.findOne({
       $or: [{ username }, { email }],
     });

     if (existedUser) {
       throw new ApiError(409, "User with email or username already exists");
     }
    
    
   
    // check for avatar image 
    const avatarImagePath = req.files.avatar[0].path;
    
    if(!avatarImagePath){
        throw new ApiError( 400 , "Avatar file is missing ");
    }

    // upload on cloudinary 
    const avatar = await uploadOnCloudinary(avatarImagePath);

    // create user object 
    const user = await User.create({
        fullName ,
        username : username.toLowerCase(),
        avatar : avatar.url,
        email,
        password,
    })

    // check if user is created
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    

    if(!createdUser){
        throw new ApiError(500 , "Something went wrong while registering the user ")
    }

    // return the user 
    return res 
    .status(201)
    .json(new ApiResponse(200 , createdUser , " User registered successfully "))
});

const loginUser = asyncHandler(async (req, res) => {
  //request body from user
  const { email, username, password } = req.body; 


  if (!username || !email) {
    throw new ApiError(400, " username or email is required");
  }

  // find the user based on either username or  : $or
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  
  // check if user exist
  if (!user) {
    throw new ApiError(404, " User does not exist");
  }

  // check password
  
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid user Credentials");
  }

  // generate access and refresh token - creating a method
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  // send cookies
  const loggedinUser = await User.findById(user._id);
  
  const options = {
    // cookies option
    httpOnly: true,
    secure: true,
  };

  //return response
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedinUser,
          accessToken,
          refreshToken,
        },
        "user logged in successfully"
      )
    );
});


const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const getCurrentUser = asyncHandler(async(req , res) => {
    return res
    .status(200)
    .json( new ApiResponse(200 , req.user , 
        "current user fetched successfully"
    ))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
};