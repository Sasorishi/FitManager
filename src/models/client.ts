export class ClientModel {
  constructor(
    public id: string,
    public first_name: string,
    public last_name: string,
    public email: string,
    public goal: string,
    public height: string,
    public weight: string,
    public allergies: string,
    public coach_id: string,
  ) {}
}
