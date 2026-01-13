import { app } from "./app";

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`\n✅ Server running on http://localhost:${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 Auth routes: http://localhost:${PORT}/auth/*`);
  console.log(`🎵 Score routes: http://localhost:${PORT}/scores`);
  console.log(`\n⏳ Aguardando requisições...\n`);
});