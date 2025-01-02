// DEPENDENCIES
import express from "express";
import dotenv from "dotenv";
dotenv.config;

// COMPONENT
import { allControl } from "../controllers/allControl.js";

export const AllRoute = express.Router();

AllRoute.get(process.env.API_PATH_ALL_READ_URLS, allControl.readUrls);
