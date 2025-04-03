import { db } from "@/lib/utils/drizzle/drizzle";
import { clients } from "@/lib/utils/drizzle/schema";
import { IClientRepository } from "@/repositories/clientRepository";
import { eq } from "drizzle-orm";
import { ClientModel } from "@/models/client";

export class DrizzleClientRepository implements IClientRepository {
  async insert(client: ClientModel): Promise<boolean> {
    try {
      await db.insert(clients).values(client);
      return true;
    } catch (e) {
      console.error("Erreur insertion drizzle :", e);
      return false;
    }
  }

  async update(client: ClientModel): Promise<boolean> {
    try {
      await db.update(clients).set(client).where(eq(clients.id, client.id));
      return true;
    } catch (e) {
      console.error("Erreur mise à jour drizzle :", e);
      return false;
    }
  }

  async delete(clientId: string): Promise<boolean> {
    try {
      await db.delete(clients).where(eq(clients.id, clientId));
      return true;
    } catch (e) {
      console.error("Erreur suppression drizzle :", e);
      return false;
    }
  }

  async getAll(): Promise<ClientModel[]> {
    try {
      return await db.select().from(clients);
    } catch (e) {
      console.error("Erreur récupération drizzle :", e);
      return [];
    }
  }

  async findBySessionId(sessionId: string): Promise<ClientModel[]> {
    try {
      return await db.select().from(clients).where(eq(clients.id, sessionId));
    } catch (e) {
      console.error("Erreur récupération drizzle :", e);
      return [];
    }
  }
}
