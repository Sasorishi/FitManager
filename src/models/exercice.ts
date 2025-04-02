// models/Exercise.ts
export class ExerciseModel {
  constructor(
    public id: number,
    public session_id: number,
    public name: string,
    public repetitions: number,
    public sets: number,
  ) {}
}
