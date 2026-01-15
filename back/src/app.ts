import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import { scoreRoutes } from "./routes/score.routes";
import { authRoutes } from "./routes/auth.routes";

export const app = express();

// 📁 Arquivos públicos
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads"))
);

// 🔥 CORS
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// JSON
app.use(express.json());

// Logs
app.use((req: Request, _res: Response, next: NextFunction) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`\n[${timestamp}] ➡️ ${req.method} ${req.url}`);
  console.log("Origin:", req.headers.origin);
  console.log("Body:", req.body);
  next();
});

// Rotas
app.use("/auth", authRoutes);
app.use("/scores", scoreRoutes);

// Health
app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    message: "Backend está funcionando!",
  });
});

// ❌ Handler global de erro
app.use(
  (err: unknown, _req: Request, res: Response) => {
    console.error("💥 ERRO NÃO TRATADO:", err);

    if (err instanceof Error) {
      return res.status(500).json({
        message: "Internal server error",
        error: err.message,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
);
