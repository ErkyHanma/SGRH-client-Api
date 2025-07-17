import { User } from "@domain/entities/UserManagement/User";
import { IUserRepository } from "@domain/interfaces/UserTypes";
import { jest } from "@jest/globals";
import {
  failure,
  OperationResult,
  success,
} from "@domain/entities/Base/OperationResult";
import { UserBuilder } from "./EntityBuilder/user.builder";

// Mock the database and mapper dependencies
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

describe("UserRepository Tests", () => {
  let mockUserRepo: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockUserRepo = mockUserRepository();
  });

  describe("getAllAsync", () => {
    it("should return all users successfully", async () => {
      // Arrange
      const mockUsers: User[] = [_userBuilder.build(), _userBuilder.build()];
      const mockResult = success("Users retrieve successfully", mockUsers);

      mockUserRepo.getAllAsync.mockResolvedValue(mockResult);

      // Act
      const result = await mockUserRepo.getAllAsync();

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockUsers);
      expect(result.message).toBe("Users retrieve successfully");
    });

    it("should return failure when repository throws an error", async () => {
      // Arrange
      const mockError = failure<User[]>(
        "Something went wrong: Database connection failed"
      );

      mockUserRepo.getAllAsync.mockResolvedValue(mockError);

      // Act
      const result = await mockUserRepo.getAllAsync();

      // Assert
      expect(result).toEqual(mockError);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        "Something went wrong: Database connection failed"
      );
    });
  });

  describe("getByIdAsync", () => {
    it("should return user when user found", async () => {
      // Arrange
      const userId = 1;
      const mockUser = _userBuilder.withUserId(userId).build();

      const mockResult = success(
        `User ${mockUser.userId} retrieved successfully`,
        mockUser
      );

      mockUserRepo.getByIdAsync.mockResolvedValue(mockResult);

      // Act
      const result = await mockUserRepo.getByIdAsync(userId);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockUser);
      expect(result.message).toBe(
        `User ${mockUser.userId} retrieved successfully`
      );
    });

    it("should return failure when user not found", async () => {
      // Arrange
      const userId = 1;

      const mockResult = failure<User>(`User with id ${userId} not found`);

      mockUserRepo.getByIdAsync.mockResolvedValue(mockResult);

      // Act
      const result = await mockUserRepo.getByIdAsync(userId);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(`User with id ${userId} not found`);
    });

    it("should return failure when repository throws an error", async () => {
      // Arrange
      const userId = 1;
      const mockResult = failure<User>(
        `Something went wrong: Database connection failed`
      );

      mockUserRepo.getByIdAsync.mockResolvedValue(mockResult);

      // Act
      const result = await mockUserRepo.getByIdAsync(userId);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        `Something went wrong: Database connection failed`
      );
    });
  });

  describe("getByEmail", () => {
    it("should return user when user found", async () => {
      // Arrange
      const userEmail = "janedoe@gmail.com";
      const mockUser = _userBuilder.withEmail(userEmail).build();

      const mockResult = success(`User retrieved successfully`, mockUser);

      mockUserRepo.getByEmail.mockResolvedValue(mockResult);

      // Act
      const result = await mockUserRepo.getByEmail(userEmail);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockUser);
      expect(result.message).toBe(`User retrieved successfully`);
    });

    it("should return failure when user not found", async () => {
      // Arrange
      const userEmail = "janedoe@gmail.com";
      const mockResult = failure<User>(
        `User not found with the given email ${userEmail}`
      );

      mockUserRepo.getByEmail.mockResolvedValue(mockResult);

      // Act
      const result = await mockUserRepo.getByEmail(userEmail);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        `User not found with the given email ${userEmail}`
      );
    });

    it("should return failure when repository throws an error", async () => {
      // Arrange
      const userEmail = "janedoe@gmail.com";
      const mockResult = failure<User>(
        `Something went wrong: Database connection failed`
      );

      mockUserRepo.getByEmail.mockResolvedValue(mockResult);

      // Act
      const result = await mockUserRepo.getByEmail(userEmail);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        `Something went wrong: Database connection failed`
      );
    });
  });

  describe("addAsync", () => {
    it("should return user when success", async () => {
      // Arrange
      const mockUser = _userBuilder.build();
      const mockResult = success(`User added successfully`, mockUser);

      mockUserRepo.addAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockUserRepo.addAsync(mockUser);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockUser);
      expect(result.message).toBe("User added successfully");
    });

    it("should return failure when repository throws an error", async () => {
      // Arrange
      const mockUser = _userBuilder.build();
      const mockResult = failure<User>(
        `Something went wrong: Database connection failed`
      );

      mockUserRepo.addAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockUserRepo.addAsync(mockUser);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        `Something went wrong: Database connection failed`
      );
    });
  });

  describe("updateAsync", () => {
    it("should return user when success", async () => {
      // Arrange
      const userId = 1;
      const mockUser = _userBuilder.withUserId(userId).build();
      const mockResult = success(`User updated successfully`, mockUser);

      mockUserRepo.updateAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockUserRepo.updateAsync(userId, mockUser);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockUser);
      expect(result.message).toBe("User updated successfully");
    });

    it("should return failure when user not found", async () => {
      // Arrange
      const userId = 1;
      const mockUser = _userBuilder.withUserId(userId).build();
      const mockResult = failure<User>(`User with id ${userId} not found`);

      mockUserRepo.updateAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockUserRepo.updateAsync(userId, mockUser);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(`User with id ${userId} not found`);
    });

    it("should return failure when user not update", async () => {
      // Arrange
      const userId = 1;
      const mockUser = _userBuilder.withUserId(userId).build();
      const mockResult = failure<User>(
        `User with id ${userId} could not be updated`
      );

      mockUserRepo.updateAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockUserRepo.updateAsync(userId, mockUser);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        `User with id ${userId} could not be updated`
      );
    });

    it("should return failure when repository throws an error", async () => {
      // Arrange
      const userId = 1;
      const mockUser = _userBuilder.withUserId(userId).build();
      const mockResult = failure<User>(
        `Something went wrong: Database connection failed`
      );

      mockUserRepo.updateAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockUserRepo.updateAsync(userId, mockUser);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        `Something went wrong: Database connection failed`
      );
    });
  });

  describe("deleteAsync", () => {
    it("should return user when success", async () => {
      // Arrange
      const userId = 1;
      const mockUser = _userBuilder.withUserId(userId).build();
      const mockResult = success(`User deleted successfully`, mockUser);

      mockUserRepo.deleteAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockUserRepo.deleteAsync(userId);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockUser);
      expect(result.message).toBe("User deleted successfully");
    });

    it("should return failure when user not found", async () => {
      // Arrange
      const userId = 1;
      const mockResult = failure<User>(`User with id ${userId} not found`);

      mockUserRepo.deleteAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockUserRepo.deleteAsync(userId);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(`User with id ${userId} not found`);
    });

    it("should return failure when user not deleted", async () => {
      // Arrange
      const userId = 1;
      const mockUser = _userBuilder.withUserId(userId).build();
      const mockResult = failure<User>(
        `User with id ${userId} could not be deleted`
      );

      mockUserRepo.deleteAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockUserRepo.deleteAsync(userId);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        `User with id ${userId} could not be deleted`
      );
    });

    it("should return failure when repository throws an error", async () => {
      // Arrange
      const userId = 1;
      const mockResult = failure<User>(
        `Something went wrong: Database connection failed`
      );

      mockUserRepo.deleteAsync.mockResolvedValue(mockResult);
      // Act
      const result = await mockUserRepo.deleteAsync(userId);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        `Something went wrong: Database connection failed`
      );
    });
  });
});
