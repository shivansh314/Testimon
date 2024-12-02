import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { deleteFromCloudinary, uploadOnCloudinary  } from "../utils/Cloudinary.js";
import { Space } from "../models/space.model.js";

 

// create Space
const createSpace = asyncHandler(async (req, res) => {
  // get the data
  const { projectName, title, customMessage, questions , starRating  , isSquare } = req.body;
  // const { name , email , company } = requiredFields;

  
  if (
    [projectName, title, customMessage, questions , starRating].some((field) => {
      field?.trim === "";
    })
  ) {
    throw new ApiError(400, "all fields are required");
  }

  // ownerid
  const ownerId = req.user?._id;
  if (!ownerId) {
    throw new ApiError(401, "Invalid User");
  }

  // get logo image

  const logoLocalPath = req.files?.logo[0].path;
  
  if (!logoLocalPath) {
    throw new ApiError(400, "Logo image is missing ");
  }

  //uploading on cloudinary
  const folderName  = "forms image"
  const logoCloudinaryLink = await uploadOnCloudinary(logoLocalPath , folderName);

  if (!logoCloudinaryLink) {
    throw new ApiError(500, "error while uploading on cloudinary ");
  }

  

  // store in the database
  const space = await Space.create({
    projectName,
    title,
    customMessage,
    logo: logoCloudinaryLink.url,
    questions,
    owner: req.user?._id,
    starRating : starRating,
    isSquare ,
  });

  const reviewLink = `http://localhost:5173/reviews/createReview/${space._id}`;

  const newSpace = await Space.findByIdAndUpdate(
    space._id,
    { $set: { link: reviewLink } },
    { new: true } // returns the updated document
  );

  
  // return  response
  return res
    .status(200)
    .json(new ApiResponse(200, 
      newSpace,
        " forms created successfully "));
});

//update Space
const updateSpace = asyncHandler(async (req, res) => {
  const { spaceId } = req.params;
  const { projectName, title, customMessage , questions , starRating  , isSquare} = req.body;


  // Check if all fields are present
  if (
    [projectName, title, customMessage, questions, starRating].some(
      (field) => !field
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Owner ID verification
  const ownerId = req.user?._id;
  if (!ownerId) {
    throw new ApiError(401, "Invalid User");
  }

  // Fetch the existing forms to check ownership
  const existingSpace = await Space.findById(spaceId);
  if (!existingSpace) {
    throw new ApiError(404, "Space not found");
  }

  // Check if the user is the owner of the forms
  if (existingSpace.owner.toString() !== ownerId.toString()) {
    throw new ApiError(403, "You do not have permission to update this forms");
  }

  // Update the photo on Cloudinary

    
    const urlPart = existingSpace.logo.split("/");
    const filename = urlPart[urlPart.length - 1];
    const oldLogoPublicId = filename.split(".")[0];


    const deleteLogo = await deleteFromCloudinary(`${oldLogoPublicId}`);
    if(!deleteLogo) {
        throw new ApiError(400 , "Error while deleting the old Logo from Cloudinary")
    }

    const newLogoLocalPath = req.files.logo[0].path;
    const folderName = "forms image"
    const newLogo = await uploadOnCloudinary(newLogoLocalPath , folderName);

    if (!newLogo) {
      throw new ApiError(400, "Error while updating the image on Cloudinary");
    }

    // Extract the image URL from the Cloudinary response
    const logoUrl = newLogo.url; 

  // Update the forms in the database
  const updatedSpace = await Space.findByIdAndUpdate(
    spaceId,
    {
      $set: {
        projectName,
        title,
        customMessage,
        questions,
        logo : logoUrl,
        starRating,
        isSquare
      },
    },
    { new: true } // returns the updated document
  );

  if (!updatedSpace) {
    throw new ApiError(500, "Error updating the forms");
  }

  // Return response
  return res
    .status(200)
    .json(new ApiResponse(200, updatedSpace, "Space updated successfully"));
});

// get Spaces of the user   
const getSpaces = asyncHandler( async (req , res) => {
  // get the user id 
  const ownerID = req.user?._id
  console.log(ownerID);
  console.log(req.user);
  
  // check if owner id is present 
  if ( !ownerID ){
    throw new ApiError( 404 , "Owner Id not found ")
  }
  
  // get spaces created by the user 
  const allSpaces = await Space.find({owner : ownerID})

  // check if Spaces exist 
  if ( !allSpaces || allSpaces.length === 0 ){
    throw new ApiError( 404 , "Could not find any Space created by the user ")
  }

  // return the Spaces 
  return res.
  status(200)
  .json(
    new ApiResponse(200 , allSpaces , "getSpaces executes Successfully")
  )

})

// get forms by id
const getSpaceById = asyncHandler( async(req , res ) => {
   // get the forms id
   const { spaceId } = req.params

   // check if the forms id exist
   if ( !spaceId ){
    throw new ApiError( 404 , " spaceId Not fouund ")
   }

   // find the forms
   const space = await Space.findById(spaceId);

   // check if the forms exist
   if ( !space ){
    throw new ApiError( 404 , "forms not found ")
   }

   // return the forms
   return res.status(200)
   .json( new ApiResponse(200 , space , ` space with id ${spaceId}`)
   )
})

// delete the forms by id
const deleteSpace = asyncHandler( async( req , res ) => {
  // get the forms id
  const { spaceId } = req.params ;

  // check if forms id is present
  if ( !spaceId ){
    throw new ApiError(404 , "could not find forms id to delete ")
  } 

  // check if the owner is verified 
  const ownerId  = req.user?._id;
  const existingSpace = await Space.findById(spaceId);
  const spaceOwner = existingSpace.owner;

  if ( ownerId.toString() !== spaceOwner.toString()){
    throw new ApiError( 400 , " you cannot delete this forms")
  }

  // delete the logo from the cloudinary 
  // console.log(existingSpace);
  
  const urlPart = existingSpace.logo.split("/");
  const filename = urlPart[urlPart.length - 1];
  const oldLogoPublicId = filename.split(".")[0];

  const deleteLogo = await deleteFromCloudinary(oldLogoPublicId);

  // check if logo was deleted
  if ( !deleteLogo ) {
    throw new ApiError( 400 , "Could not delete the logo from cloudinary ")
  }

  // delete the forms from database
  const deleteSpace = await Space.findByIdAndDelete(spaceId);

  // check if the forms is deleting
  if (!deleteSpace){
     throw new ApiError( 400 , " Could not delete the forms")
  }

  return res.status(200).json( new ApiResponse( 200 , "' forms deleted successfully "))
 
})




export { createSpace, updateSpace , getSpaces , deleteSpace , getSpaceById};
