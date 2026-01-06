import { Router } from "express";
import { ScoreController } from "../controllers/score.controller";

export const scoreRoutes = Router();

const controller = new ScoreController();

scoreRoutes.post("/", controller.create);
scoreRoutes.get("/", controller.findAll);
scoreRoutes.get("/:id", controller.findById);
scoreRoutes.put("/:id", controller.update);
scoreRoutes.delete("/:id", controller.delete);
