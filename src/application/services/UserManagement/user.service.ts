import { UserDto } from "@application/Dtos/UserManagement/UserDto";
import {
  failure,
  OperationResult,
  success,
} from "@domain/entities/Base/OperationResult";
import { User } from "@domain/entities/UserManagement/User";
import { IUserRepository, IUserService } from "@domain/interfaces/UserTypes";
import { UserMapper } from "@infraestrucutre/mappers/user.mapper";

export class UserService implements IUserService {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  public async getAllUser(): Promise<OperationResult<UserDto[]>> {
    try {
      const users = await this.userRepository.getAllAsync();

      if (!users.isSuccess) {
        return failure(users.message);
      }

      return success(
        users.message,
        users.data?.map((user) => UserMapper.toUserDto(user))
      );
    } catch (error) {
      return failure(`Something went wrong ${error}`);
    }
  }

  public async getUserByID(id: number): Promise<OperationResult<UserDto>> {
    try {
      const users = await this.userRepository.getByIdAsync(id);

      if (!users.isSuccess || !users.data) {
        return failure(users.message);
      }

      return success(users.message, UserMapper.toUserDto(users?.data));
    } catch (error) {
      return failure(`Something went wrong ${error}`);
    }
  }

  public async getUserByEmail(
    email: string
  ): Promise<OperationResult<UserDto>> {
    try {
      const user = await this.userRepository.getByEmail(email);

      if (!user.isSuccess || !user.data) {
        return failure(user.message);
      }

      return success(user.message, UserMapper.toUserDto(user?.data));
    } catch (error) {
      return failure(`Something went wrong ${error}`);
    }
  }

  public async AddUser(user: User): Promise<OperationResult<UserDto>> {
    try {
      const users = await this.userRepository.addAsync(user);

      if (!users.isSuccess || !users.data) {
        return failure(users.message);
      }

      return success(users.message, UserMapper.toUserDto(users?.data));
    } catch (error) {
      return failure(`Something went wrong ${error}`);
    }
  }
  public async updateUser(
    id: number,
    user: User
  ): Promise<OperationResult<UserDto | null>> {
    try {
      const users = await this.userRepository.updateAsync(id, user);

      if (!users.isSuccess || !users.data) {
        return failure(users.message);
      }

      return success(users.message, UserMapper.toUserDto(users.data));
    } catch (error) {
      return failure(`Something went wrong ${error}`);
    }
  }
  public async deleteUser(id: number): Promise<OperationResult<boolean>> {
    try {
      const users = await this.userRepository.deleteAsync(id);

      if (!users.isSuccess || !users.data) {
        return failure(users.message);
      }

      return success(users.message);
    } catch (error) {
      return failure(`Something went wrong ${error}`);
    }
  }
}
