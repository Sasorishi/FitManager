import { ExerciseModel } from "@/models/exercise";
import { DrizzleExerciseRepository } from "@/repositories/drizzleExerciseRepository";

export class ExerciseService {
  constructor(private repository = new DrizzleExerciseRepository()) {}

  async create(input: {
    session_id: string;
    name: string;
    repetitions: number;
    sets: number;
  }): Promise<boolean> {
    const exercise = new ExerciseModel(
      input.session_id,
      input.name,
      input.repetitions,
      input.sets,
    );
    return await this.repository.insert(exercise);
  }

  async update(input: {
    id: string;
    name: string;
    repetitions: number;
    sets: number;
  }): Promise<boolean> {
    const exercise = new ExerciseModel(
      input.id,
      input.name,
      input.repetitions,
      input.sets,
    );
    return await this.repository.update(exercise);
  }

  async delete(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }

  async findBySessionId(sessionId: string): Promise<ExerciseModel[]> {
    return await this.repository.findBySessionId(sessionId);
  }

  async getAll(): Promise<ExerciseModel[]> {
    return await this.repository.getAll();
  }
}
