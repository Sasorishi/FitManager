import { NextRequest, NextResponse } from "next/server";
import { RegisterClientService } from "@/services/client/clientRegisterService";
import { DrizzleClientRepository } from "@/repositories/drizzleClientRepository";
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

export const DELETE = async (req: NextRequest) => {
  try {
    // Récupérer l'ID du client à partir des paramètres d'URL
    const { searchParams } = new URL(req.url);
    const clientId = searchParams.get("id");

    if (!clientId) {
      return new NextResponse("ID du client manquant", { status: 400 });
    }

    // Initialisation du client Supabase
    const supabase = await createClient();

    // Effectuer la suppression
    const { error } = await supabase.from("client").delete().eq("id", clientId);

    if (error) {
      console.error("Erreur lors de la suppression du client :", error.message);
      return new NextResponse(`Erreur suppression client : ${error.message}`, {
        status: 500,
      });
    }

    return new NextResponse("Client supprimé avec succès", { status: 200 });
  } catch (error: any) {
    console.error("Erreur dans DELETE /api/users :", error);
    return new NextResponse(`Erreur serveur : ${error.message}`, {
      status: 500,
    });
  }
};
