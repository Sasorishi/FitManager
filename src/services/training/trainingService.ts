// src/services/training/createTrainingSessionService.ts
import { ITrainingSessionRepository } from "@/repositories/trainingRepository";
import { TrainingSessionModel } from "@/models/training";

export class TrainingSessionService {
  constructor(private repo: ITrainingSessionRepository) {}

  async create(session: TrainingSessionModel): Promise<boolean> {
    return this.repo.insert(session);
  }

  async getById(id: string): Promise<TrainingSessionModel | null> {
    return this.repo.getById(id);
  }

  async getAll(): Promise<TrainingSessionModel[]> {
    return this.repo.getAll();
  }

  async update(session: TrainingSessionModel): Promise<boolean> {
    return this.repo.update(session);
  }

  async delete(id: string): Promise<boolean> {
    return this.repo.delete(id);
  }
}
