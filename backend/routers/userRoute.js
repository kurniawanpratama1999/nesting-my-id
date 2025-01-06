// DEPENDENCIES
import express from "express";
import dotenv from "dotenv";
dotenv.config();

// COMPONENT
import { userControl } from "../controllers/userControl.js";
import middleware from "../middleware/middleware.js";

export const userRouter = express.Router();

userRouter.get(
  process.env.API_PATH_USER_READ_LINK,
  middleware.protected,
  userControl.readLink
);

userRouter.get(
  process.env.API_PATH_USER_READ_URLS,
  middleware.protected,
  userControl.readUrls
);

userRouter.post(
  process.env.API_PATH_USER_CREATE_LINK,
  middleware.protected,
  userControl.createLink
);

userRouter.put(
  process.env.API_PATH_USER_UPDATE_LINK,
  middleware.protected,
  userControl.updateLink
);

userRouter.delete(
  process.env.API_PATH_USER_DELETE_LINK,
  middleware.protected,
  userControl.deleteLink
);

userRouter.put(
  process.env.API_PATH_USER_CHANGE_NAME,
  middleware.protected,
  userControl.changeDisplayName
);

userRouter.put(
  process.env.API_PATH_USER_CHANGE_USERNAME,
  middleware.protected,
  userControl.changeUsername
);

userRouter.put(
  process.env.API_PATH_USER_CHANGE_EMAIL,
  middleware.protected,
  userControl.changeEmail
);
userRouter.put(
  process.env.API_PATH_USER_CHANGE_PASSWORD,
  middleware.protected,
  userControl.changePassword
);

userRouter.put("/check-email-and-send-otp", userControl.checkEmailAndSendOtp);
userRouter.delete("/remove-otp", userControl.removeOTP);
userRouter.post("/check-otp", userControl.checkOTP);
userRouter.put("/check-password", userControl.checkPassword);
