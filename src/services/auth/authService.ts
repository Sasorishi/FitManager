export interface IAuthService {
  register(
    email: string,
    password: string,
    displayName?: string,
  ): Promise<{ id: string } | null>;
}

export interface ILoginService {
  login(email: string, password: string): Promise<{ data: any; error: any }>;
}
