import express from "express";
import { authControl } from "../controllers/authControl.js";
import middleware from "../middleware/middleware.js";

export const authRouter = express.Router();

authRouter.post("/login", authControl.login);
authRouter.post("/register", authControl.register);
authRouter.get("/profile", middleware.protected, authControl.profile);
