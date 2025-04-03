import { RegisterClientService } from "@/services/client/clientRegisterService";
import { DrizzleClientRepository } from "@/repositories/drizzleClientRepository";
import { IAuthService } from "@/services/auth/authService";
import { faker } from "@faker-js/faker";

// Mock du repository et du service d'authentification
const mockRepository = {
  insert: jest.fn(),
} as unknown as DrizzleClientRepository;

const mockAuthService = {
  register: jest.fn(),
} as unknown as IAuthService;

describe("RegisterClientService", () => {
  let registerClientService: RegisterClientService;

  beforeEach(() => {
    jest.clearAllMocks();
    registerClientService = new RegisterClientService(
      mockRepository,
      mockAuthService,
    );
  });

  it("should successfully register a new client", async () => {
    // Mock de la réponse du service d'auth
    const mockUserId = faker.string.uuid();
    mockAuthService.register.mockResolvedValueOnce({ id: mockUserId });

    // Mock de l'insertion en base de données
    mockRepository.insert.mockResolvedValueOnce(true);

    const result = await registerClientService.execute();

    expect(result).not.toBeNull();
    expect(result?.id).toBe(mockUserId);
    expect(mockAuthService.register).toHaveBeenCalled();
    expect(mockRepository.insert).toHaveBeenCalledWith(
      expect.objectContaining({ id: mockUserId }),
    );
  });

  it("should return null if registration fails", async () => {
    // Simule un échec de l'inscription Supabase
    mockAuthService.register.mockResolvedValueOnce(null);

    const result = await registerClientService.execute();

    expect(result).toBeNull();
    expect(mockRepository.insert).not.toHaveBeenCalled();
  });

  it("should return null if database insertion fails", async () => {
    const mockUserId = faker.string.uuid();
    mockAuthService.register.mockResolvedValueOnce({ id: mockUserId });

    // Simule un échec de l'insertion en base
    mockRepository.insert.mockResolvedValueOnce(false);

    const result = await registerClientService.execute();

    expect(result).toBeNull();
    expect(mockRepository.insert).toHaveBeenCalled();
  });
});
