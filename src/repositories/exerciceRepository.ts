import { ExerciseModel } from "@/models/exercise";

export interface IExerciseRepository {
  insert(exercise: ExerciseModel): Promise<boolean>;
  findBySessionId(sessionId: string): Promise<ExerciseModel[]>;
  update(exercise: ExerciseModel): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  getAll(): Promise<ExerciseModel[]>;
}
