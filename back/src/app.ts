import express from "express";
import { scoreRoutes } from "./routes/score.routes";
import { authRoutes } from "./routes/auth.routes";

export const app = express();

app.use(express.json());

app.use("/scores", scoreRoutes);
app.use("/auth", authRoutes);
