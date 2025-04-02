export interface IClientRepository {
  insert(client: any): Promise<boolean>;
}
