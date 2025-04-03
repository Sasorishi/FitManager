import { SupabaseLogoutService } from "@/services/supabase/supabaseLogoutService";

export class LogoutService {
  private logoutService: SupabaseLogoutService;

  constructor(logoutService: SupabaseLogoutService) {
    this.logoutService = logoutService;
  }

  async logout() {
    return await this.logoutService.logout();
  }
}
