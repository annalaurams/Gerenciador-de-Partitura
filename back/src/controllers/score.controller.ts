import { Request, Response } from "express";
import { ScoreService } from "../services/score.service";
import path from "path";
import fs from "fs";

export class ScoreController {
  private service: ScoreService;

  constructor() {
    this.service = new ScoreService();
  }

  create = async (req: Request, res: Response) => {
    try {
      const data = {
        ...req.body,
        filePath: req.file?.filename,
        fileName: req.file?.originalname,
      };

      const score = await this.service.create(data);
      
      return res.status(201).json({
        ...score,
        fileUrl: score.filePath
          ? `${process.env.API_URL}/files/${score.filePath}`
          : null,
      });
    } catch (error: unknown) {
      console.error("Error creating score:", error);

      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(400).json({ message: "Erro ao criar partitura" });
    }
  };

  findAll = async (_req: Request, res: Response) => {
    try {
      const scores = await this.service.findAll();

      const scoresWithFileUrl = scores.map((score) => ({
        ...score,
        fileUrl: score.filePath
          ? `${process.env.API_URL}/files/${score.filePath}`
          : null,
      }));

      return res.json(scoresWithFileUrl);
    } catch (error: unknown) {
      console.error("Error finding scores:", error);

      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(400).json({ message: "Erro ao buscar partituras" });
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const score = await this.service.findById(req.params.id);

      if (!score) {
        return res.status(404).json({ message: "Partitura não encontrada" });
      }

      return res.json({
        ...score,
        fileUrl: score.filePath
          ? `${process.env.API_URL}/files/${score.filePath}`
          : null,
      });
    } catch (error: unknown) {
      console.error("Error finding score:", error);

      return res.status(400).json({ message: "Erro ao buscar partitura" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (req.file) {
        const oldScore = await this.service.findById(id);

        if (oldScore?.filePath) {
          const oldFilePath = path.resolve(
            __dirname,
            "..",
            "..",
            "uploads",
            "scores",
            oldScore.filePath
          );

          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }
        }
      }

      const data = {
        ...req.body,
        ...(req.file && {
          filePath: req.file.filename, // 🔥 SÓ o filename, SEM "scores/"
          fileName: req.file.originalname,
        }),
      };

      const score = await this.service.update(id, data);
      
      return res.json({
        ...score,
        fileUrl: score.filePath
          ? `${process.env.API_URL}/files/${score.filePath}`
          : null,
      });
    } catch (error: unknown) {
      console.error("Error updating score:", error);

      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(400).json({ message: "Erro ao atualizar partitura" });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const score = await this.service.findById(id);

      if (score?.filePath) {
        const filePath = path.resolve(
          __dirname,
          "..",
          "..",
          "uploads",
          "scores",
          score.filePath
        );

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      await this.service.delete(id);
      return res.status(204).send();
    } catch (error: unknown) {
      console.error("Error deleting score:", error);

      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(400).json({ message: "Erro ao excluir partitura" });
    }
  };
}