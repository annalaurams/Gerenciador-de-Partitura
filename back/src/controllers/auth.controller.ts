import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const service = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      console.log("=== REGISTER REQUEST ===");
      console.log("📥 BODY:", JSON.stringify(req.body, null, 2));
      console.log("📥 HEADERS:", req.headers);

      const user = await service.register(req.body);

      console.log("✅ USER CREATED:", user.id);

      // Remove o password da resposta
      const { password, ...userWithoutPassword } = user;

      return res.status(201).json(userWithoutPassword);
    } catch (error: any) {
      console.error("❌ REGISTER ERROR:", error.message);
      console.error("Stack:", error.stack);
      return res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      console.log("=== LOGIN REQUEST ===");
      console.log("📥 BODY:", JSON.stringify(req.body, null, 2));
      console.log("📥 HEADERS:", req.headers);

      const result = await service.login(req.body);

      console.log("🔐 TOKEN GENERATED");
      console.log("Token:", result.token.substring(0, 20) + "...");

      return res.json(result);
    } catch (error: any) {
      console.error("❌ LOGIN ERROR:", error.message);
      console.error("Stack:", error.stack);
      return res.status(400).json({ message: error.message });
    }
  }
}