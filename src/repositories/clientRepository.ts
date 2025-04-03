import { ClientModel } from "@/models/client";

export interface IClientRepository {
  insert(client: ClientModel): Promise<boolean>;
  update(client: ClientModel): Promise<boolean>;
  delete(clientId: string): Promise<boolean>;
  getAll(): Promise<ClientModel[]>;
  findBySessionId(sessionId: string): Promise<ClientModel[]>;
}
