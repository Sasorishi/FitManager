import { supabase } from "@/lib/utils/supabase/client";
import { User } from "@/types/user";

// Interface UserRepository pour définir la signature des méthodes
export interface IUserRepository {
  getUsers(count: number): Promise<User[]>; // Typage de la méthode getUsers
}

class UserRepository implements IUserRepository {
  async getUsers(count: number): Promise<User[]> {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .limit(count);

    if (error) {
      console.error(
        "Erreur lors de la récupération des utilisateurs :",
        error.message,
      );
      return [];
    }

    return data as User[];
  }
}

export const userRepository = new UserRepository();
