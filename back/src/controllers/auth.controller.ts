import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const service = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      console.log("📥 REGISTER BODY:", req.body);

      const user = await service.register(req.body);

      console.log("✅ USER CREATED:", user.id);

      return res.status(201).json(user);
    } catch (error: any) {
      console.error("❌ REGISTER ERROR:", error.message);
      return res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      console.log("📥 LOGIN BODY:", req.body);

      const result = await service.login(req.body);

      console.log("🔐 TOKEN GENERATED");

      return res.json(result);
    } catch (error: any) {
      console.error("❌ LOGIN ERROR:", error.message);
      return res.status(400).json({ message: error.message });
    }
  }
}
