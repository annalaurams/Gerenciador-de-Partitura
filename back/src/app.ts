import express from "express";
import { scoreRoutes } from "./routes/score.routes";

export const app = express();

app.use(express.json());

app.use("/scores", scoreRoutes);
