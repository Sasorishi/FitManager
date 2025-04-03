import { SupabaseAuthServiceServer } from "@/services/supabase/supabaseLoginService";
import { ILoginService } from "./authService";

export class LoginService implements ILoginService {
  private authService: SupabaseAuthServiceServer;

  constructor(authService: SupabaseAuthServiceServer) {
    this.authService = authService;
  }

  async login(email: string, password: string) {
    return await this.authService.login(email, password);
  }
}
