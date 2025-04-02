import {
  pgTable,
  uuid,
  text,
  timestamp,
  date,
  integer,
} from "drizzle-orm/pg-core";

export const clients = pgTable("client", {
  id: uuid("id").primaryKey(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  email: text("email").notNull(),
  goal: text("goal").notNull(),
  height: text("height").notNull(),
  weight: text("weight").notNull(),
  allergies: text("allergies").notNull(),
  coach_id: text("coach_id").notNull(),
});

// Table training_session
export const training_sessions = pgTable("training_session", {
  id: uuid("id").primaryKey().defaultRandom(),
  id_coach: uuid("id_coach").notNull(),
  id_client: uuid("id_client").notNull(),
  start_date: date("start_date").notNull(),
  end_date: date("end_date").notNull(),
  session_type: text("session_type").notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Table exercise
export const exercises = pgTable("exercise", {
  id: uuid("id").defaultRandom().primaryKey(),
  session_id: uuid("session_id").notNull(),
  name: text("name").notNull(),
  repetitions: integer("repetitions").notNull(),
  sets: integer("sets").notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
