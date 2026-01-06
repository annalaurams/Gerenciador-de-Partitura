import { Request, Response } from "express";
import { ScoreService } from "../services/score.service";

export class ScoreController {
  private service: ScoreService;

  constructor() {
    this.service = new ScoreService();
  }

  create = async (req: Request, res: Response) => {
    const score = await this.service.create(req.body);
    return res.status(201).json(score);
  };

  findAll = async (_req: Request, res: Response) => {
    const scores = await this.service.findAll();
    return res.json(scores);
  };

  findById = async (req: Request, res: Response) => {
    const score = await this.service.findById(req.params.id);
    return res.json(score);
  };

  update = async (req: Request, res: Response) => {
    const score = await this.service.update(req.params.id, req.body);
    return res.json(score);
  };

  delete = async (req: Request, res: Response) => {
    await this.service.delete(req.params.id);
    return res.status(204).send();
  };
}
