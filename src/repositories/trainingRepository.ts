import { TrainingSessionModel } from "@/models/training";

export interface ITrainingSessionRepository {
  insert(session: TrainingSessionModel): Promise<boolean>;
  getById(id: string): Promise<TrainingSessionModel | null>;
  getAll(): Promise<TrainingSessionModel[]>;
  update(session: TrainingSessionModel): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}
