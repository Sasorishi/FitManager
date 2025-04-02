export class ExerciseModel {
  constructor(
    public session_id: string,
    public name: string,
    public repetitions: number,
    public sets: number,
    public id?: string, // optionnel car auto-généré
  ) {}
}
