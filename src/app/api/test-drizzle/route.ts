import { NextResponse } from "next/server";
import { db } from "@/lib/utils/drizzle/drizzle";
import { clients } from "@/lib/utils/drizzle/schema"; // ← schéma SQL pour Drizzle
import { userSchema } from "@/schemas/userSchema"; // ← validation Zod

export async function GET() {
  try {
    const result = await db.select().from(clients).limit(1);

    // ✅ Validation Zod pour chaque entrée
    const validated = result
      .map((client) => userSchema.safeParse(client))
      .filter((r) => r.success)
      .map((r) => r.data);

    return NextResponse.json({
      message: "Connexion réussie ✅",
      clients: validated,
    });
  } catch (err) {
    console.error("Erreur complète Drizzle ❌", JSON.stringify(err, null, 2));
    return NextResponse.json(
      { error: "Erreur connexion Drizzle ❌", raw: err },
      { status: 500 },
    );
  }
}
