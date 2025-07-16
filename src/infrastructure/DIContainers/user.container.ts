import { UserService } from "@application/services/UserManagement/user.service";
import { Logger } from "@infrastructure/logger/logger";
import { UserRepository } from "@infrastructure/repositories/UserManagement/user.repository";

class UserContainer {
  private static logger = new Logger();
  private static userRepository = new UserRepository(UserContainer.logger);

  static getUserRepository() {
    return this.userRepository;
  }

  static getUserService() {
    return new UserService(this.getUserRepository(), this.logger);
  }
}

export { UserContainer };
