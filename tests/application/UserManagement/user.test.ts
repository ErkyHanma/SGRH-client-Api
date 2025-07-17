import { UserService } from "@application/services/UserManagement/user.service";
import { ILogger } from "@domain/interfaces/ILogger";
import { IUserRepository, IUserService } from "@domain/interfaces/UserTypes";
import { failure, success } from "@domain/entities/Base/OperationResult";
import { UserBuilder } from "../../repositories/UserManagement/EntityBuilder/user.builder";
import { UserMapper } from "@infrastructure/mappers/user.mapper";
import { User } from "@domain/entities/UserManagement/User";
import { UserDto } from "@application/Dtos/UserManagement/UserDto";

jest.mock("@infrastructure/database");
jest.mock("@infrastructure/mappers/user.mapper");

const _userBuilder = new UserBuilder();

export const mockUserRepository = (): jest.Mocked<IUserRepository> => ({
  getAllAsync: jest.fn(),
  getByIdAsync: jest.fn(),
  getByEmail: jest.fn(),
  addAsync: jest.fn(),
  updateAsync: jest.fn(),
  deleteAsync: jest.fn(),
});

describe("User service tests", () => {
  let mockUserRepo: jest.Mocked<IUserRepository>;
  let _logger: jest.Mocked<ILogger>;
  let userService: UserService;

  beforeEach(() => {
    mockUserRepo = mockUserRepository();

    _logger = {
      Info: jest.fn(),
      Error: jest.fn(),
    };

    userService = new UserService(mockUserRepo, _logger);
  });

  describe("getAllUser", () => {
    it("should return users dtos when success", async () => {
      // Arrange
      const mockUsers = [_userBuilder.build(), _userBuilder.build()];
      const mockResult = success("Users retrieve successfully", mockUsers);

      mockUserRepo.getAllAsync.mockResolvedValue(mockResult);

      // Act
      const result = await userService.getAllUser();

      // Assert
      expect(mockUserRepo.getAllAsync).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        ...mockResult,
        data: mockResult.data?.map((user) => UserMapper.toUserDto(user)),
      });
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(
        mockUsers.map((user) => UserMapper.toUserDto(user))
      );
      expect(result.message).toBe("Users retrieve successfully");
    });

    it("should return failure when service throws an error", async () => {
      // Arrange
      const mockResult = failure<User[]>(
        "Something went wrong: Database connection failed"
      );

      mockUserRepo.getAllAsync.mockResolvedValue(mockResult);

      // Act
      const result = await userService.getAllUser();

      // Assert
      expect(mockUserRepo.getAllAsync).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        "Something went wrong: Database connection failed"
      );
    });
  });

  describe("getUserByID", () => {
    it("should return user dto when success", async () => {
      // Arrange
      const userId = 1;
      const mockUser = _userBuilder.withUserId(userId).build();
      const mockResult = success("User retrieve successfully", mockUser);

      mockUserRepo.getByIdAsync.mockResolvedValue(mockResult);

      // Act
      const result = await userService.getUserByID(userId);

      // Assert
      expect(mockUserRepo.getByIdAsync).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        ...mockResult,
        data: mockResult.data && UserMapper.toUserDto(mockResult.data),
      });
      expect(result.isSuccess).toBe(true);
      expect(result.message).toBe("User retrieve successfully");
    });

    it("should return failure when repository returns failure", async () => {
      // Arrange
      const userId = 1;
      const mockResult = failure<User>(`User with id ${userId} not found`);

      mockUserRepo.getByIdAsync.mockResolvedValue(mockResult);

      // Act
      const result = await userService.getUserByID(userId);

      // Assert
      expect(mockUserRepo.getByIdAsync).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(`User with id ${userId} not found`);
    });

    it("should return failure when service throws an error", async () => {
      // Arrange
      const userId = 1;
      const mockResult = failure<User>(
        `"Something went wrong: Database connection failed`
      );

      mockUserRepo.getByIdAsync.mockResolvedValue(mockResult);

      // Act
      const result = await userService.getUserByID(userId);

      // Assert
      expect(mockUserRepo.getByIdAsync).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        `"Something went wrong: Database connection failed`
      );
    });
  });

  describe("getUserByEmail", () => {
    it("should return user dto when success", async () => {
      // Arrange
      const userEmail = "janedoe@gmail.com";
      const mockUser = _userBuilder.withEmail(userEmail).build();
      const mockResult = success("User retrieve successfully", mockUser);

      mockUserRepo.getByEmail.mockResolvedValue(mockResult);

      // Act
      const result = await userService.getUserByEmail(userEmail);

      // Assert
      expect(mockUserRepo.getByEmail).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        ...mockResult,
        data: mockResult.data && UserMapper.toUserDto(mockResult.data),
      });
      expect(result.isSuccess).toBe(true);
      expect(result.message).toBe("User retrieve successfully");
    });

    it("should return failure when repository returns failure", async () => {
      // Arrange
      const userEmail = "janedoe@gmail.com";
      const mockResult = failure<User>(
        `User not found with the given email ${userEmail}`
      );

      mockUserRepo.getByEmail.mockResolvedValue(mockResult);

      // Act
      const result = await userService.getUserByEmail(userEmail);

      // Assert
      expect(mockUserRepo.getByEmail).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        `User not found with the given email ${userEmail}`
      );
    });

    it("should return failure when service throws an error", async () => {
      // Arrange
      const userEmail = "janedoe@gmail.com";
      const mockResult = failure<User>(
        `"Something went wrong: Database connection failed`
      );

      mockUserRepo.getByEmail.mockResolvedValue(mockResult);

      // Act
      const result = await userService.getUserByEmail(userEmail);

      // Assert
      expect(mockUserRepo.getByEmail).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        `"Something went wrong: Database connection failed`
      );
    });
  });

  describe("AddUser", () => {
    it("should return user dto when success", async () => {
      // Arrange
      const mockUser = _userBuilder.build();
      const mockResult = success("User added successfully", mockUser);

      mockUserRepo.addAsync.mockResolvedValue(mockResult);

      // Act
      const result = await userService.AddUser(mockUser);

      // Assert
      expect(mockUserRepo.addAsync).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        ...mockResult,
        data: mockResult.data && UserMapper.toUserDto(mockResult.data),
      });
      expect(result.isSuccess).toBe(true);
      expect(result.message).toBe("User added successfully");
    });

    it("should return failure when repository returns failure", async () => {
      // Arrange
      const mockUser = _userBuilder.build();
      const mockResult = failure<User>(
        `Something went wrong: Repository error`
      );

      mockUserRepo.addAsync.mockResolvedValue(mockResult);

      // Act
      const result = await userService.AddUser(mockUser);

      // Assert
      expect(mockUserRepo.addAsync).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(`Something went wrong: Repository error`);
    });

    it("should return failure when service throws an error", async () => {
      // Arrange
      const mockUser = _userBuilder.build();
      const errorMessage = "Database connection failed";
      const expectedMessage = `Something went wrong: ${errorMessage}`;

      mockUserRepo.addAsync.mockRejectedValue(new Error(errorMessage));

      // Act
      const result = await userService.AddUser(mockUser);

      // Assert
      expect(mockUserRepo.addAsync).toHaveBeenCalledTimes(1);
      expect(mockUserRepo.addAsync).toHaveBeenCalledWith(mockUser);

      expect(result.isSuccess).toBe(false);
      expect(result.data).toBeUndefined();
      expect(result.message).toBe(expectedMessage);
    });
  });

  describe("updateUser", () => {
    it("should return user dto when success", async () => {
      // Arrange
      const userId = 1;
      const mockUser = _userBuilder.withUserId(userId).build();
      const mockResult = success("User updated successfully", mockUser);

      mockUserRepo.updateAsync.mockResolvedValue(mockResult);

      // Act
      const result = await userService.updateUser(userId, mockUser);

      // Assert
      expect(mockUserRepo.updateAsync).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        ...mockResult,
        data: mockResult.data && UserMapper.toUserDto(mockResult.data),
      });
      expect(result.isSuccess).toBe(true);
      expect(result.message).toBe("User updated successfully");
    });

    it("should return failure when repository returns failure", async () => {
      // Arrange
      const userId = 1;
      const mockUser = _userBuilder.withUserId(userId).build();
      const mockResult = failure<User>(
        `Something went wrong: Repository error`
      );

      mockUserRepo.updateAsync.mockResolvedValue(mockResult);

      // Act
      const result = await userService.updateUser(userId, mockUser);

      // Assert
      expect(mockUserRepo.updateAsync).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(`Something went wrong: Repository error`);
    });

    it("should return failure when service throws an error", async () => {
      // Arrange
      const userId = 1;
      const mockUser = _userBuilder.build();
      const errorMessage = "Database connection failed";
      const expectedMessage = `Something went wrong: ${errorMessage}`;

      mockUserRepo.updateAsync.mockRejectedValue(new Error(errorMessage));

      // Act
      const result = await userService.updateUser(userId, mockUser);

      // Assert
      expect(mockUserRepo.updateAsync).toHaveBeenCalledTimes(1);
      expect(mockUserRepo.updateAsync).toHaveBeenCalledWith(userId, mockUser);

      expect(result.isSuccess).toBe(false);
      expect(result.data).toBeUndefined();
      expect(result.message).toBe(expectedMessage);
    });
  });

  describe("deleteUser", () => {
    it("should return true when success", async () => {
      // Arrange
      const userId = 1;
      const mockUser = _userBuilder.withUserId(userId).build();
      const mockResult = success("User deleted successfully", mockUser);

      mockUserRepo.deleteAsync.mockResolvedValue(mockResult);

      // Act
      const result = await userService.deleteUser(userId);

      // Assert
      expect(mockUserRepo.deleteAsync).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        ...mockResult,
        data: true,
      });
      expect(result.isSuccess).toBe(true);
      expect(result.message).toBe("User deleted successfully");
    });

    it("should return failure when repository returns failure", async () => {
      // Arrange
      const userId = 1;
      const mockResult = failure<User>(
        `Something went wrong: Repository error`
      );

      mockUserRepo.deleteAsync.mockResolvedValue(mockResult);

      // Act
      const result = await userService.deleteUser(userId);

      // Assert
      expect(mockUserRepo.deleteAsync).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(`Something went wrong: Repository error`);
    });

    it("should return failure when service throws an error", async () => {
      // Arrange
      const userId = 1;
      const errorMessage = "Database connection failed";
      const expectedMessage = `Something went wrong: ${errorMessage}`;

      mockUserRepo.deleteAsync.mockRejectedValue(new Error(errorMessage));

      // Act
      const result = await userService.deleteUser(userId);

      // Assert
      expect(mockUserRepo.deleteAsync).toHaveBeenCalledTimes(1);
      expect(mockUserRepo.deleteAsync).toHaveBeenCalledWith(userId);

      expect(result.isSuccess).toBe(false);
      expect(result.data).toBeUndefined();
      expect(result.message).toBe(expectedMessage);
    });
  });
});
