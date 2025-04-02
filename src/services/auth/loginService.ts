import { SupabaseAuthServiceServer } from "@/services/supabase/supabaseLoginService";
import { ILoginService } from "./authService";

const authService = new SupabaseAuthServiceServer();

export class LoginService implements ILoginService {
  async login(email: string, password: string) {
    return await authService.login(email, password);
  }
}
