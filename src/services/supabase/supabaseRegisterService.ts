import { createClient } from "@/lib/utils/supabase/server";
import { IAuthService } from "@/services/auth/authService";

export class SupabaseAuthServiceServer implements IAuthService {
  async register(
    email: string,
    password: string,
    displayName?: string,
  ): Promise<{ id: string } | null> {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName ?? email },
      },
    });

    if (error || !data?.user?.id) {
      console.error("❌ Erreur Supabase Auth register:", error.message);
      return null;
    }

    return { id: data.user.id };
  }
}
