import { prisma } from "../database/prisma";
import type { CreateScoreDTO, UpdateScoreDTO } from "../types/score.types";

export class ScoreService {
  async create(data: CreateScoreDTO) {
    return prisma.score.create({ data });
  }

  async findAll() {
    return prisma.score.findMany();
  }

  async findById(id: string) {
    return prisma.score.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateScoreDTO) {
    return prisma.score.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.score.delete({ where: { id } });
  }
}
