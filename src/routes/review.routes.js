import { Router } from "express";
import { createReview, deleteReview, getAllReview  , createVideoReview} from "../controllers/review.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";


const reviewRouter = Router()

// creating a review
reviewRouter.route("/createReview/:spaceId").post( createReview
)
 
reviewRouter.route("/getAllReview/:spaceId").get(getAllReview);

reviewRouter.route("/deleteReview/:reviewId").delete(deleteReview)

reviewRouter.route("/createVideoReview/:spaceId").post(
  upload.fields([
    {
      name : "video" ,
      maxCount : 1
    }
  ]) ,
  createVideoReview);




export default reviewRouter;