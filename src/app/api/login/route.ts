import { NextRequest, NextResponse } from "next/server";
import { SupabaseAuthServiceServer } from "@/services/supabase/supabaseLoginService";

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { status: 400 },
      );
    }

    const authService = new SupabaseAuthServiceServer();
    const { data, error } = await authService.login(email, password);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json({ user: data.user });
  } catch (err: any) {
    console.error("❌ Erreur API login :", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
};
