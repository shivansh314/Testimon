import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { Space } from "../models/space.model.js";

// create

const createSpace = asyncHandler(async (req, res) => {
  // get the data
  const { projectName, title, customMessage, questions } = req.body;

  if (
    [projectName, title, customMessage,  questions].some((field) => {
      field?.trim() === "";
    })
  ) {
    throw new ApiError(400, "all fields are required");
  }

  // get logo image
 
  const logoLocalPath = req.files.logo[0].path;
  console.log(logoLocalPath);
  if (!logoLocalPath) {
    throw new ApiError(400, "Logo image is missing ");
  }

  //uploading on cloudinary
  const logoCloudinaryLink = await uploadOnCloudinary(logoLocalPath);

  if(!logoCloudinaryLink){
    throw new ApiError(500 , "error while uploading on cloudinary ")
  }


  // store in the database 
  const space = await Space.create({
    projectName ,
    title ,
    customMessage,
    logo : logoCloudinaryLink.url,
    questions
  })

  const createdSpace = await Space.findById(space._id)

  // return  response 
  return res.status(200).json(
    new ApiResponse(200 , createdSpace , " space created successfully ")
  )
});

const updateSpace = asyncHandler( async( req , res ) => {
    // get information
    const {projectName, title, customMessage, owner, questions} = req.body;

    // check if all fields are present 
    if (
      [projectName, title, customMessage, owner, questions].some((fields) => {
        fields.trim === "";
      })
    ) {
      throw new ApiError(400, "all fields are required");
    }

    // update space 
    const updatedSpace = Space.findByIdAndUpdate(
        req.space?._id,
        {
           $set : {
            projectName :projectName , 
            title : title , 
            customMessage :customMessage ,
            owner : owner ,
            questions : questions,
           },
        },
        {
            new : true 
        }  
    )

    // return response 
    return res.status(200)
    .json( new ApiResponse(200 , updatedSpace , " space updated successfully" ))
})


export  {
    createSpace,
    updateSpace,
}