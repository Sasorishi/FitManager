import { NextRequest, NextResponse } from "next/server";
import { RegisterClientService } from "@/services/client/clientRegisterService";
import { DrizzleClientRepository } from "@/repositories/drizzleRepository";
import { createClient } from "@/lib/utils/supabase/server";
import { SupabaseAuthServiceServer } from "@/services/supabase/supabaseRegisterService";

export const POST = async (req: NextRequest) => {
  try {
    const repository = new DrizzleClientRepository();
    const authService = new SupabaseAuthServiceServer();
    const registerClient = new RegisterClientService(repository, authService);

    const user = await registerClient.execute();

    if (!user) throw new Error("Erreur lors de la création de l'utilisateur");

    return NextResponse.json([user]);
  } catch (error: any) {
    console.error("❌ Erreur dans POST /api/users :", error);
    return new NextResponse(`Erreur serveur : ${error.message}`, {
      status: 500,
    });
  }
};

export const GET = async () => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.from("client").select("*");

    if (error) {
      console.error(
        "Erreur lors de la récupération des clients :",
        error.message,
      );
      return new NextResponse(
        `Erreur récupération clients : ${error.message}`,
        { status: 500 },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur API GET /api/users :", error);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
};
