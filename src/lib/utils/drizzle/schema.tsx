import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const clients = pgTable("client", {
  id_client: uuid("id_client").primaryKey(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  email: text("email").notNull(),
  goal: text("goal").notNull(),
  height: text("height").notNull(),
  weight: text("weight").notNull(),
  allergies: text("allergies").notNull(),
  id_coach: text("id_coach").notNull(),
});
