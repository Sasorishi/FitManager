import { userRepository } from "@/repositories/userRepository";
import UserModel from "@/models/user";
import { IUserRepository } from "@/repositories/userRepository";

class UserService {
  private repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  async getUsers(count: number): Promise<UserModel[]> {
    const users = await this.repository.getUsers(count);

    return users
      .map((user) => UserModel.fromData(user))
      .filter(Boolean) as UserModel[];
  }
}

export const userService = new UserService(userRepository);
