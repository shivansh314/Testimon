import { Router } from "express";
import { createSpace, updateSpace } from "../controllers/space.controller.js";

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

spaceRouter.route("/updateSpace").post(
    updateSpace
)

export default spaceRouter;