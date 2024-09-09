import { Router } from "express";
import { createReview, deleteReview, getAllReview } from "../controllers/review.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";


const reviewRouter = Router()

// creating a reveiew
reviewRouter.route("/createReview/:spaceId").post(
    upload.fields([
        {
            name : "video" ,
            maxCount : 1
        }
    ]) , 
    createReview
)
 
reviewRouter.route("/getAllReview/:spaceId").get(getAllReview);

reviewRouter.route("/deleteReview/:reviewId").delete(deleteReview)




export default reviewRouter;