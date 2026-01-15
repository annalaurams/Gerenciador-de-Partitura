export interface CreateScoreDTO {
  name: string;
  instrument?: string;
  tone?: string;
  composer?: string;
  description?: string;
  filePath?: string;
}

export type UpdateScoreDTO = Partial<CreateScoreDTO>;
