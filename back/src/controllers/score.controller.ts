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
        filePath: req.file ? req.file.filename : undefined,
      };

      const score = await this.service.create(data);
      return res.status(201).json(score);
    } catch (error: any) {
      console.error("Error creating score:", error);
      return res.status(400).json({ message: error.message });
    }
  };

  findAll = async (_req: Request, res: Response) => {
    try {
      const scores = await this.service.findAll();
      return res.json(scores);
    } catch (error: any) {
      console.error("Error finding scores:", error);
      return res.status(400).json({ message: error.message });
    }
  };

  // findById = async (req: Request, res: Response) => {
  //   try {
  //     const score = await this.service.findById(req.params.id);

  //     if (!score) {
  //       return res.status(404).json({ message: "Score not found" });
  //     }

  //     // Adiciona a URL completa do arquivo
  //     const scoreWithUrl = {
  //       ...score,
  //       fileName: score.filePath, // 👈 Envia como fileName para o front
  //       fileUrl: score.filePath
  //         ? `http://localhost:3333/uploads/scores/${score.filePath}`
  //         : null,
  //     };

  //     return res.json(scoreWithUrl);
  //   } catch (error: any) {
  //     console.error("Error finding score:", error);
  //     return res.status(400).json({ message: error.message });
  //   }
  // };
  findById = async (req: Request, res: Response) => {
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
  };


  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      // Se tem arquivo novo, deleta o antigo
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
            console.log("🗑️ Arquivo antigo deletado:", oldScore.filePath);
          }
        }
      }

      const data = {
        ...req.body,
        filePath: req.file ? req.file.filename : undefined,
      };

      const score = await this.service.update(id, data);
      return res.json(score);
    } catch (error: any) {
      console.error("Error updating score:", error);
      return res.status(400).json({ message: error.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      // Busca a partitura para pegar o caminho do arquivo
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
          console.log("🗑️ Arquivo deletado:", score.filePath);
        }
      }

      await this.service.delete(id);
      return res.status(204).send();
    } catch (error: any) {
      console.error("Error deleting score:", error);
      return res.status(400).json({ message: error.message });
    }
  };
}