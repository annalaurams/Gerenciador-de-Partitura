import express from "express";
import cors from "cors";
import { scoreRoutes } from "./routes/score.routes";
import { authRoutes } from "./routes/auth.routes";

export const app = express();

app.use((req, _res, next) => {
  console.log("➡️ Request:", req.method, req.url);
  next();
});

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/scores", scoreRoutes);
