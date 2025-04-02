import { IAuthService } from "@/services/auth/authService";
import { faker } from "@faker-js/faker";
import { DrizzleClientRepository } from "@/repositories/drizzleRepository";

export class RegisterClientService {
  constructor(
    private repository: DrizzleClientRepository,
    private authService: IAuthService,
  ) {}

  async execute() {
    console.log("🔥 Lancement RegisterClientService");

    const email = faker.internet.email();
    const password = faker.internet.password();
    const first_name = faker.person.firstName();
    const last_name = faker.person.lastName();
    const display_name = `${first_name} ${last_name}`;

    const authResult = await this.authService.register(
      email,
      password,
      display_name,
    );
    console.log("🧪 Résultat register Supabase Auth:", authResult);

    if (!authResult?.id) {
      console.error("❌ Création Supabase Auth échouée");
      return null;
    }

    const user = {
      id_client: authResult.id,
      email,
      password,
      first_name,
      last_name,
      goal: faker.helpers.arrayElement([
        "Perdre du poids",
        "Prendre du muscle",
      ]),
      height: faker.number.float({ min: 1.5, max: 2.0 }).toFixed(2),
      weight: faker.number.float({ min: 50, max: 100 }).toFixed(1),
      allergies: "",
      id_coach: null,
    };

    console.log("📦 Données insérées :", user);

    const ok = await this.repository.insert(user);
    return ok ? user : null;
  }
}
