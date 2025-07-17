import { jest } from "@jest/globals";
import {
  failure,
  OperationResult,
  success,
} from "@domain/entities/Base/OperationResult";

import { RoomBuilder } from "./EntityBuilder/room.builder";
import { IRoomRepository } from "@domain/interfaces/HotelTypes";
import { RoomDetails } from "@infrastructure/repositories/Hotel/room.repository";

// Mock the database and mapper dependencies
jest.mock("@infrastructure/database");
jest.mock("@infrastructure/mappers/hotel.mapper");

const _roomBuilder = new RoomBuilder();

export const mockRoomRepository = (): jest.Mocked<IRoomRepository> => ({
  getAllAsync: jest.fn(),
  getByIdAsync: jest.fn(),
});

describe("RoomRepository Tests", () => {
  let mockRoomRepo: jest.Mocked<IRoomRepository>;

  beforeEach(() => {
    mockRoomRepo = mockRoomRepository();
  });

  describe("getAllAsync", () => {
    it("should return all rooms successfully", async () => {
      // Arrange
      const mockRooms: RoomDetails[] = [
        _roomBuilder.buildRoomDetails(),
        _roomBuilder.buildRoomDetails(),
      ];
      const mockResult = success("Rooms retrieve successfully", mockRooms);

      mockRoomRepo.getAllAsync.mockResolvedValue(mockResult);

      // Act
      const result = await mockRoomRepo.getAllAsync();

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockRooms);
      expect(result.message).toBe("Rooms retrieve successfully");
    });

    it("should return failure when rooms not found ", async () => {
      // Arrange
      const mockError = failure<RoomDetails[]>("Rooms cannot be retrieve");

      mockRoomRepo.getAllAsync.mockResolvedValue(mockError);

      // Act
      const result = await mockRoomRepo.getAllAsync();

      // Assert
      expect(result).toEqual(mockError);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe("Rooms cannot be retrieve");
    });

    it("should return failure when repository throws an error", async () => {
      // Arrange
      const mockError = failure<RoomDetails[]>(
        "Something went wrong: Database connection failed"
      );

      mockRoomRepo.getAllAsync.mockResolvedValue(mockError);

      // Act
      const result = await mockRoomRepo.getAllAsync();

      // Assert
      expect(result).toEqual(mockError);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        "Something went wrong: Database connection failed"
      );
    });
  });

  describe("getByIdAsync", () => {
    it("should return room when found", async () => {
      // Arrange
      const roomId = 1;
      const mockRoom = _roomBuilder.withRoomId(roomId).buildRoomDetails();

      const mockResult = success(
        `Room with ID ${mockRoom.Room.roomId} retrieve successfully`,
        mockRoom
      );

      mockRoomRepo.getByIdAsync.mockResolvedValue(mockResult);

      // Act
      const result = await mockRoomRepo.getByIdAsync(roomId);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockRoom);
      expect(result.message).toBe(
        `Room with ID ${mockRoom.Room.roomId} retrieve successfully`
      );
    });

    it("should return failure when room not found", async () => {
      // Arrange
      const roomId = 1;
      const mockResult = failure<RoomDetails>(
        `Room with the ID ${roomId} not found`
      );

      mockRoomRepo.getByIdAsync.mockResolvedValue(mockResult);

      // Act
      const result = await mockRoomRepo.getByIdAsync(roomId);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(`Room with the ID ${roomId} not found`);
    });

    it("should return failure when repository throws an error", async () => {
      // Arrange
      const roomId = 1;
      const mockResult = failure<RoomDetails>(
        `Something went wrong: Database connection failed`
      );

      mockRoomRepo.getByIdAsync.mockResolvedValue(mockResult);

      // Act
      const result = await mockRoomRepo.getByIdAsync(roomId);

      // Assert
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(
        `Something went wrong: Database connection failed`
      );
    });
  });
});
