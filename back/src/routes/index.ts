import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { scoreRoutes } from "./score.routes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/scores", scoreRoutes);

export { routes };
