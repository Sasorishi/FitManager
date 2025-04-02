import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// ⚠️ Mets ici ton URL Postgres de Supabase (attention : pas l'URL publique de l'API)
const queryClient = postgres(process.env.DATABASE_URL!, { ssl: "require" });

export const db = drizzle(queryClient);
