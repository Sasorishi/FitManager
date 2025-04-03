import { LogoutService } from "@/services/auth/logoutService";
import { SupabaseLogoutService } from "@/services/supabase/supabaseLogoutService";

// Mock du service de déconnexion
jest.mock("@/services/supabase/supabaseLogoutService", () => {
  return {
    SupabaseLogoutService: jest.fn().mockImplementation(() => ({
      logout: jest.fn(),
    })),
  };
});

describe("LogoutService", () => {
  let logoutService: LogoutService;
  let logoutAuthService: jest.Mocked<SupabaseLogoutService>;

  beforeEach(() => {
    logoutAuthService =
      new SupabaseLogoutService() as jest.Mocked<SupabaseLogoutService>;
    logoutService = new LogoutService(logoutAuthService);
  });

  it("should return null error on successful logout", async () => {
    logoutAuthService.logout.mockResolvedValueOnce({ error: null });

    const result = await logoutService.logout();

    expect(result).toEqual({ error: null });
    expect(logoutAuthService.logout).toHaveBeenCalledTimes(1);
  });

  it("should return error on failed logout", async () => {
    const mockError = { message: "Logout failed" };
    logoutAuthService.logout.mockResolvedValueOnce({ error: mockError });

    const result = await logoutService.logout();

    expect(result).toEqual({ error: mockError });
    expect(logoutAuthService.logout).toHaveBeenCalledTimes(1);
  });
});
