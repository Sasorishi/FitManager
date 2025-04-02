import { ExerciseModel } from "@/models/exercice";

export interface IExerciseRepository {
  insert(exercise: ExerciseModel): Promise<boolean>;
}
