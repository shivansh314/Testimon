import { asyncHandler , } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { Review } from "../models/review.model.js";
import { isValidObjectId } from "mongoose";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/Cloudinary.js";


// create review 
const createReview = asyncHandler(async (req, res) => {
  // get the spaceId and check if it is valid and present
  const { spaceId } = req.params;

  if (!spaceId || !isValidObjectId(spaceId)) {
    throw new ApiError(404, "could not find spaceId");
  }

  // extract the information from the request body
  const { name, email, company, starRating, review } = req.body;

  // Check if all required fields are present
  if ([name, starRating, review].some((field) => !field)) {
    throw new ApiError(400, "Required fields are missing");
  }

   // TODO : FIX THE VIDEO HANDLING

  // create a new review in the database
  const newReview = await Review.create({
    name,
    email,
    company,
    starRating,
    review,
    video : null,
    space: spaceId,
  });

  // return response
  return res
    .status(200)
    .json(new ApiResponse(200, newReview, "New review created successfully"));
});

// get all review for that forms

const getAllReview = asyncHandler( async(req , res ) => {
  // get the spaceId 
  const { spaceId } = req.params;
  console.log(spaceId);
  

  if ( !spaceId || !isValidObjectId(spaceId)){
    throw new ApiError(404 , "spaceId not found ")
  }

  // find all the review where forms matcher
  const spaceReviews = await Review.find({ space : spaceId });

  if ( !spaceReviews ){
    throw new ApiError(404 , "forms reviews not found ");
  }

  // return the reviews 
  return res 
  .status( 200 )
  .json( new ApiResponse( 200 , spaceReviews , " all review found "))
})

// delete the review 

const deleteReview = asyncHandler( async(req , res ) => {
  // Get the review id
  const { reviewId } = req.params;

  // Check if review id is present
  if (!reviewId) {
    throw new ApiError(404, "ReviewForm ID is not present");
  }

  // Find the review in the database
  const review = await Review.findById(reviewId);

  if (!review) {
    throw new ApiError(404, "ReviewForm not found");
  }

  // Get the Cloudinary public_id from the review object (assuming review object contains a video field with public_id)
  const videoPublicId = review.video;
  if (videoPublicId) {
    // Delete the video from Cloudinary
    const deleteVideo = await deleteFromCloudinary(videoPublicId);
    if (!deleteVideo)
      throw new ApiError(400, " cannot delete from the database");
  }

  // Delete the review from the database
  await Review.findByIdAndDelete(reviewId);

  // Send success response
  res.status(200).json({
    success: true,
    message: "ReviewForm and associated video deleted successfully",
  });
})

// get video review

const createVideoReview = asyncHandler( async(req , res ) => {
  // get the spaceId and check if it is valid and present
  const { spaceId } = req.params;

  if (!spaceId || !isValidObjectId(spaceId)) {
    throw new ApiError(404, "could not find spaceId");
  }

  // extract the information from the request body
  const { name, email, company, starRating, review } = req.body;

  // Check if all required fields are present
  if ([name, starRating, review].some((field) => !field)) {
    throw new ApiError(400, "Required fields are missing");
  }

  //getting file from the user
  const videoFile = req.files?.video?.[0]?.path;

  // if videoFile is present upload on cloudinary

  const folderName = 'videos';
  const videoCloudinaryLink = await uploadOnCloudinary(videoFile , folderName);

  if (!videoCloudinaryLink) {
    throw new ApiError(400, "Could not upload the video on cloudinary");}


  // create a new review in the database
  const newReview = await Review.create({
    name,
    email,
    company,
    starRating,
    review,
    video: videoCloudinaryLink.url ,
    space: spaceId,
  });

  // return response
  return res
    .status(200)
    .json(new ApiResponse(200, newReview, "New review created successfully"));





})


export { createReview , getAllReview , deleteReview , createVideoReview }