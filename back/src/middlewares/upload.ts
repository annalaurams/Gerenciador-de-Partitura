import multer from "multer";
import path from "path";

export const upload = multer({
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "uploads", "scores"),
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  }),
});
