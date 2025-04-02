import { db } from "@/lib/utils/drizzle/drizzle";
import { clients } from "@/lib/utils/drizzle/schema";
import { IClientRepository } from "@/repositories/clientRepository";

export class DrizzleClientRepository implements IClientRepository {
  async insert(client: any): Promise<boolean> {
    try {
      await db.insert(clients).values(client);
      return true;
    } catch (e) {
      console.error("Erreur insertion drizzle :", e);
      return false;
    }
  }
}
