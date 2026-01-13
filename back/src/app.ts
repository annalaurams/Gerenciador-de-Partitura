import express from "express";
import cors from "cors";
import { scoreRoutes } from "./routes/score.routes";
import { authRoutes } from "./routes/auth.routes";

export const app = express();

// 🔥 CORS permissivo para desenvolvimento
app.use(cors({
  origin: true,  // 👈 Aceita qualquer origem durante desenvolvimento
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Parse JSON
app.use(express.json());

// Logs de debug
app.use((req, _res, next) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`\n[${timestamp}] ➡️  ${req.method} ${req.url}`);
  console.log("Origin:", req.headers.origin);
  console.log("Body:", req.body);
  next();
});

// Rotas
app.use("/auth", authRoutes);
app.use("/scores", scoreRoutes);

// Rota de teste
app.get("/health", (_req, res) => {
  console.log("✅ Health check chamado");
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    message: "Backend está funcionando!"
  });
});

// Handler de erro global
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("💥 ERRO NÃO TRATADO:", err);
  res.status(500).json({ message: "Internal server error", error: err.message });
});