import multer from "multer";
import path from "path";
import crypto from "crypto";
import { Request } from "express";

export const uploadConfig = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "uploads", "scores"),
    filename(_req, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;
      callback(null, fileName);
    },
  }),

  fileFilter(
    _req: Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback
  ) {
    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "application/zip",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Tipo de arquivo não permitido"));
    }
  },

  limits: {
    fileSize: 10 * 1024 * 1024,
  },
};
