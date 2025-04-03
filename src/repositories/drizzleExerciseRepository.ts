import { db } from "@/lib/utils/drizzle/drizzle";
import { exercises } from "@/lib/utils/drizzle/schema";
import { IExerciseRepository } from "@/repositories/exerciceRepository";
import { ExerciseModel } from "@/models/exercise";
import { eq, InferInsertModel } from "drizzle-orm";

export class DrizzleExerciseRepository implements IExerciseRepository {
  async insert(exercise: ExerciseModel): Promise<boolean> {
    try {
      const values: InferInsertModel<typeof exercises> = {
        session_id: exercise.session_id,
        name: exercise.name,
        repetitions: exercise.repetitions,
        sets: exercise.sets,
      };

      await db.insert(exercises).values(values);
      return true;
    } catch (e) {
      console.error("Erreur insertion exercice :", e);
      return false;
    }
  }

  async findBySessionId(sessionId: string): Promise<ExerciseModel[]> {
    const rows = await db
      .select()
      .from(exercises)
      .where(eq(exercises.session_id, sessionId));
    return rows.map(
      (row) =>
        new ExerciseModel(
          row.session_id,
          row.name,
          row.repetitions,
          row.sets,
          row.id,
        ),
    );
  }

  async update(exercise: ExerciseModel): Promise<boolean> {
    try {
      await db
        .update(exercises)
        .set({
          name: exercise.name,
          repetitions: exercise.repetitions,
          sets: exercise.sets,
        })
        .where(eq(exercises.id, exercise.id));
      return true;
    } catch (e) {
      console.error("Erreur mise à jour exercice :", e);
      return false;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await db.delete(exercises).where(eq(exercises.id, id));
      return true;
    } catch (e) {
      console.error("Erreur suppression exercice :", e);
      return false;
    }
  }

  async getAll(): Promise<ExerciseModel[]> {
    const rows = await db.select().from(exercises);
    return rows.map(
      (row) =>
        new ExerciseModel(
          row.session_id,
          row.name,
          row.repetitions,
          row.sets,
          row.id,
        ),
    );
  }
}
