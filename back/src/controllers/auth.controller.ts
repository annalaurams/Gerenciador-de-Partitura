import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  private service: AuthService;

  constructor() {
    this.service = new AuthService();
  }

  register = async (req: Request, res: Response) => {
    const user = await this.service.register(req.body);
    return res.status(201).json(user);
  };

  login = async (req: Request, res: Response) => {
    const result = await this.service.login(req.body);
    return res.json(result);
  };
}
