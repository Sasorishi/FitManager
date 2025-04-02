import { createClient } from "@/lib/utils/supabase/server";

export class SupabaseLogoutService {
  async logout(): Promise<{ error: any }> {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    return { error };
  }
}
