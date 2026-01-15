import { Router } from "express";
import { ScoreController } from "../controllers/score.controller";
import { upload } from "../middlewares/upload";

export const scoreRoutes = Router();

const controller = new ScoreController();

scoreRoutes.post("/", upload.single("file"), controller.create);
scoreRoutes.get("/", controller.findAll);
scoreRoutes.get("/:id", controller.findById);
scoreRoutes.put("/:id", upload.single("file"), controller.update); // 👈 ESSENCIAL
scoreRoutes.delete("/:id", controller.delete);
