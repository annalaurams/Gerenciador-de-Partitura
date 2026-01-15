import { Request, Response } from "express";
import { ScoreService } from "../services/score.service";

export class ScoreController {
  private service: ScoreService;

  constructor() {
    this.service = new ScoreService();
  }

  create = async (req: Request, res: Response) => {
    const filePath = req.file ? `/uploads/scores/${req.file.filename}` : null;

    const score = await this.service.create({
      ...req.body,
      filePath,
    });

    return res.status(201).json(score);
  };

  update = async (req: Request, res: Response) => {
    const filePath = req.file ? `/uploads/scores/${req.file.filename}` : undefined;

    const score = await this.service.update(req.params.id, {
      ...req.body,
      ...(filePath && { filePath }),
    });

    return res.json(score);
  };

  findAll = async (_req: Request, res: Response) => {
    return res.json(await this.service.findAll());
  };

  findById = async (req: Request, res: Response) => {
    return res.json(await this.service.findById(req.params.id));
  };

  delete = async (req: Request, res: Response) => {
    await this.service.delete(req.params.id);
    return res.status(204).send();
  };
}
