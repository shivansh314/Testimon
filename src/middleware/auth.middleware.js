import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

const verifyJWT = asyncHandler(async(req, res , next) => {
    try {
      // getting the access token for the user cookies
      const accessToken =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

      // if accessToken is not found
      if (!accessToken) {
        throw new ApiError(400, "access token not found ");
      }

      // decode token
      const decodedToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );

      // returns the user after authentication is done based on the token
      const user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );

      // if user not found
      if (!user) {
        throw new ApiError(401, "Invalid Access Token");
      }

      // the authenticated user is attached to the request body
      req.user = user;

      // move to next operation
      next();
    } catch (error) {
         throw new ApiError(401, error?.message || "INVALID ACCESS TOKEN");
    } 

})

export  {verifyJWT};