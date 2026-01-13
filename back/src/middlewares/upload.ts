import multer from "multer";
import { uploadConfig } from "../config/upload";

export const uploadScoreFile = multer(uploadConfig).single("file");
