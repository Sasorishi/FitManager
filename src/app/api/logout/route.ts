import { NextRequest, NextResponse } from "next/server";
import { SupabaseLogoutService } from "@/services/supabase/supabaseLogoutService";

export const POST = async (_req: NextRequest) => {
  try {
    const service = new SupabaseLogoutService();
    const { error } = await service.logout();

    if (error) {
      console.error("❌ Erreur Supabase logout:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error("❌ Erreur API logout :", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
};
