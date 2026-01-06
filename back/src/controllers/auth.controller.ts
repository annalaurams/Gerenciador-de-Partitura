import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const service = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    const user = await service.register(req.body);
    return res.status(201).json(user);
  }

  async login(req: Request, res: Response) {
    const result = await service.login(req.body);
    return res.json(result);
  }
}
