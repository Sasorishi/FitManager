import { createClient } from "@/lib/utils/supabase/server";
import { ILoginService } from "@/services/auth/authService";

export class SupabaseAuthServiceServer implements ILoginService {
  async login(
    email: string,
    password: string,
  ): Promise<{ data: any; error: any }> {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { data, error };
  }
}
