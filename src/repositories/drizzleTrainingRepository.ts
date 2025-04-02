import { db } from "@/lib/utils/drizzle/drizzle";
import { training_sessions } from "@/lib/utils/drizzle/schema";
import { TrainingSessionModel } from "@/models/training";
import { ITrainingSessionRepository } from "@/repositories/trainingRepository";
import { InferInsertModel } from "drizzle-orm";
import { eq } from "drizzle-orm";

export class DrizzleTrainingSessionRepository
  implements ITrainingSessionRepository
{
  async insert(session: TrainingSessionModel): Promise<boolean> {
    try {
      const values: InferInsertModel<typeof training_sessions> = {
        id_coach: session.coach_id,
        id_client: session.client_id,
        start_date: session.start_date.toISOString().split("T")[0],
        end_date: session.end_date.toISOString().split("T")[0],
        session_type: session.session_type,
      };

      await db.insert(training_sessions).values(values);

      return true;
    } catch (error) {
      console.error("Erreur création session :", error);
      return false;
    }
  }

  async getById(id: string): Promise<TrainingSessionModel | null> {
    try {
      const sessions = await db
        .select()
        .from(training_sessions)
        .where(eq(training_sessions.id, id));
      const session = sessions.length > 0 ? sessions[0] : null;
      return session
        ? new TrainingSessionModel(
            session.coach_id,
            session.client_id,
            new Date(session.start_date),
            new Date(session.end_date),
            session.session_type,
            session.id,
          )
        : null;
    } catch (error) {
      console.error("Erreur lors de la récupération de la session :", error);
      return null;
    }
  }

  async getAll(): Promise<TrainingSessionModel[]> {
    try {
      const sessions = await db.select().from(training_sessions);
      return sessions.map(
        (session) =>
          new TrainingSessionModel(
            session.coach_id,
            session.client_id,
            new Date(session.start_date),
            new Date(session.end_date),
            session.session_type,
            session.id,
          ),
      );
    } catch (error) {
      console.error("Erreur lors de la récupération des sessions :", error);
      return [];
    }
  }

  async update(session: TrainingSessionModel): Promise<boolean> {
    try {
      await db
        .update(training_sessions)
        .set({
          coach_id: session.coach_id,
          client_id: session.client_id,
          start_date: session.start_date.toISOString(),
          end_date: session.end_date.toISOString(),
          session_type: session.session_type,
        })
        .where(eq(training_sessions.id, session.id));
      return true;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la session :", error);
      return false;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await db.delete(training_sessions).where(eq(training_sessions.id, id));
      return true;
    } catch (error) {
      console.error("Erreur lors de la suppression de la session :", error);
      return false;
    }
  }
}
