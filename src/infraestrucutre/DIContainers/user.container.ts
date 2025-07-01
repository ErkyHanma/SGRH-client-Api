import { UserService } from "@application/services/UserManagement/user.service";
import { UserRepository } from "@infraestrucutre/repositories/UserManagement/user.repository";

class UserContainer {
  private static userRepository = new UserRepository();

  static getUserRepository() {
    return this.userRepository;
  }

  static getUserService() {
    return new UserService(this.getUserRepository());
  }
}

export { UserContainer };
