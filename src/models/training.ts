export class TrainingSessionModel {
  constructor(
    public coach_id: string,
    public client_id: string,
    public start_date: Date,
    public end_date: Date,
    public session_type: string,
    public id?: string, // optionnel en dernier
  ) {}
}
