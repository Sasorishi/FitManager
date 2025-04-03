import { DrizzleClientRepository } from "@/repositories/drizzleClientRepository";

export class ClientService {
  constructor(private repository = new DrizzleClientRepository()) {}

  async create(client: any): Promise<boolean> {
    return await this.repository.insert(client);
  }

  async update(client: any): Promise<boolean> {
    return await this.repository.update(client);
  }

  async delete(clientId: string): Promise<boolean> {
    return await this.repository.delete(clientId);
  }

  async getAll(): Promise<any[]> {
    return await this.repository.getAll();
  }
}
