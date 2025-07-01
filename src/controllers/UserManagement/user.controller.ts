import { failure, success } from "@domain/entities/Base/OperationResult";
import { User } from "@domain/entities/UserManagement/User";
import { UserContainer } from "@infraestrucutre/DIContainers/user.container";

export class UserController {
  private readonly userService = UserContainer.getUserService();

  public async getAllUserAsync(req: any, res: any) {
    try {
      const user = await this.userService.getAllUser();

      if (!user.isSuccess) {
        return res.status(400).json(user.message);
      }

      return res.status(200).json(success(user.message, user.data));
    } catch (error) {
      return res
        .status(500)
        .json(
          failure(
            `Error while retrieving users. Error: ${(error as Error).message}`
          )
        );
    }
  }

  public async getUserByIDAsync(req: any, res: any) {
    try {
      const user = await this.userService.getUserByID(req.params.id);

      if (!user.isSuccess) {
        return res.status(400).json(user.message);
      }

      return res.status(200).json(success(user.message, user.data));
    } catch (error) {
      return res
        .status(500)
        .json(
          failure(
            `Error while retrieving users. Error: ${(error as Error).message}`
          )
        );
    }
  }

  public async getUserEmailAsync(req: any, res: any) {
    try {
      const user = await this.userService.getUserByEmail(req.params.email);

      if (!user.isSuccess) {
        return res.status(400).json(user.message);
      }

      return res.status(200).json(success(user.message, user.data));
    } catch (error) {
      return res
        .status(500)
        .json(
          failure(
            `Error while retrieving users. Error: ${(error as Error).message}`
          )
        );
    }
  }

  public async AddUserAsync(req: any, res: any) {
    try {
      const newUser: User = req.body;
      const user = await this.userService.AddUser(newUser);

      if (!user.isSuccess) {
        return res.status(400).json(user.message);
      }

      return res.status(200).json(success(user.message, user.data));
    } catch (error) {
      return res
        .status(500)
        .json(
          failure(
            `Error while retrieving users. Error: ${(error as Error).message}`
          )
        );
    }
  }

  public async UpdateUserAsync(req: any, res: any) {
    try {
      const userId = req.params.id;
      const newUser: User = req.body;
      const user = await this.userService.updateUser(userId, newUser);

      if (!user.isSuccess) {
        return res.status(400).json(user.message);
      }

      return res.status(200).json(success(user.message, user.data));
    } catch (error) {
      return res
        .status(500)
        .json(
          failure(
            `Error while retrieving users. Error: ${(error as Error).message}`
          )
        );
    }
  }

  public async DeleteUserAsync(req: any, res: any) {
    try {
      const userId = req.params.id;
      const user = await this.userService.deleteUser(userId);

      if (!user.isSuccess) {
        return res.status(400).json(user.message);
      }

      return res.status(200).json(success(user.message, user.data));
    } catch (error) {
      return res
        .status(500)
        .json(
          failure(
            `Error while retrieving users. Error: ${(error as Error).message}`
          )
        );
    }
  }
}
