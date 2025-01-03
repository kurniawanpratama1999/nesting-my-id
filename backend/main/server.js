// DEPENDENCIES
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

// COMPONENT
import { authRouter } from "../routers/authRoute.js";
import { userRouter } from "../routers/userRoute.js";
import { authControl } from "../controllers/authControl.js";
import { AllRoute } from "../routers/allRoute.js";
import middleware from "../middleware/middleware.js";

// edited by termux

const allowedAccess = [process.env.ORIGIN_1, process.env.ORIGIN_2];
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedAccess.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Access not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(cookieParser());
app.use(process.env.API_PATH_MAIN_AUTH, authRouter);
app.use(process.env.API_PATH_MAIN_USER, userRouter);
app.use(process.env.API_PATH_MAIN_ALL, AllRoute);

app.post(process.env.API_PATH_MAIN_REFRESH_TOKEN, middleware.refresh);
app.post(process.env.API_PATH_MAIN_PROTECTED_PAGE, middleware.protectedPage);
app.delete(process.env.API_PATH_MAIN_LOGOUT, authControl.logout);

// dont forget to create delete all expired link

app.listen(process.env.SERVER_PORT, () => {
  console.log(`server berjalan di port: ${process.env.SERVER_PORT}`);
});
