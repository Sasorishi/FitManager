import { validateUser } from "@/schemas/userSchema";
import { User } from "@/types/user";

class UserModel implements User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public avatar: string,
  ) {}

  // Exemple de méthode de logique métier
  getFullName(): string {
    return `${this.name} (${this.email})`;
  }

  // Méthode de validation
  static fromData(data: unknown): UserModel | null {
    const result = validateUser(data);
    if (!result.success) {
      console.error("Validation failed", result.error.errors);
      return null;
    }
    return new UserModel(
      result.data.id ?? "",
      result.data.display_name ?? "",
      result.data.email ?? "",
      "",
    );
  }
}

export default UserModel;
