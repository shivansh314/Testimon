import { Router } from "express";
import { createSpace, getSpaces, updateSpace , deleteSpace
  , getSpaceById
} from "../controllers/space.controller.js";

import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const spaceRouter = Router();

//create space 
spaceRouter.route("/createSpace").post(

  verifyJWT,
  upload.fields([
    {
      name: "logo",
      maxCount: 1,
    },
  ]),

  createSpace
);

// updateSpace 

spaceRouter.route("/updateSpace/:spaceId").post(
  verifyJWT,
  upload.fields([
    {
      name: "logo",
      maxCount: 1,
    },
  ]),
  updateSpace
);


// getSpaces

spaceRouter.route("/getSpaces").get(
  verifyJWT,
  getSpaces
)

// delete the space by id 
spaceRouter.route("/getSpaceById/:spaceId").get(getSpaceById);

// delete space 
spaceRouter.route( "/deleteSpace/:spaceId").delete(verifyJWT , deleteSpace);
export default spaceRouter;