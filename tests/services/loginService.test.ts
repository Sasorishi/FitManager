import { LoginService } from "@/services/auth/loginService";
import { SupabaseAuthServiceServer } from "@/services/supabase/supabaseLoginService";

// Mock du service d'authentification
jest.mock("@/services/supabase/supabaseLoginService", () => {
  return {
    SupabaseAuthServiceServer: jest.fn().mockImplementation(() => ({
      login: jest.fn(),
    })),
  };
});

describe("LoginService", () => {
  let loginService: LoginService;
  let authService: jest.Mocked<SupabaseAuthServiceServer>;

  beforeEach(() => {
    authService =
      new SupabaseAuthServiceServer() as jest.Mocked<SupabaseAuthServiceServer>;
    loginService = new LoginService(authService);
  });

  it("should return data on successful login", async () => {
    const mockData = { user: { id: "abc123", email: "test@example.com" } };
    authService.login.mockResolvedValueOnce({ data: mockData, error: null });

    const result = await loginService.login("test@example.com", "password123");

    expect(result).toEqual({ data: mockData, error: null });
    expect(authService.login).toHaveBeenCalledWith(
      "test@example.com",
      "password123",
    );
  });

  it("should return error on failed login", async () => {
    const mockError = { message: "Invalid credentials" };
    authService.login.mockResolvedValueOnce({ data: null, error: mockError });

    const result = await loginService.login("wrong@example.com", "wrongpass");

    expect(result).toEqual({ data: null, error: mockError });
    expect(authService.login).toHaveBeenCalledWith(
      "wrong@example.com",
      "wrongpass",
    );
  });
});
