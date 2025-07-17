import { ILogger } from "@domain/interfaces/ILogger";
import { failure, success } from "@domain/entities/Base/OperationResult";
import { RoomBuilder } from "../../repositories/Hotel/EntityBuilder/room.builder";
import { IRoomRepository } from "@domain/interfaces/HotelTypes";
import { RoomService } from "@application/services/Hotel/room.service";
import { RoomMapper } from "@infrastructure/mappers/hotel.mapper";
import { RoomDetails } from "@infrastructure/repositories/Hotel/room.repository";

jest.mock("@infrastructure/database");
jest.mock("@infrastructure/mappers/hotel.mapper");

const _roomBuilder = new RoomBuilder();

export const mockRoomRepository = (): jest.Mocked<IRoomRepository> => ({
  getAllAsync: jest.fn(),
  getByIdAsync: jest.fn(),
});

describe("Room service tests", () => {
  let mockRoomRepo: jest.Mocked<IRoomRepository>;
  let _logger: jest.Mocked<ILogger>;
  let roomService: RoomService;

  beforeEach(() => {
    mockRoomRepo = mockRoomRepository();

    _logger = {
      Info: jest.fn(),
      Error: jest.fn(),
    };

    roomService = new RoomService(mockRoomRepo, _logger);
  });

  describe("getAllRoomAsync", () => {
    it("should return services dtos when success", async () => {
      // Arrange
      const mockRooms = [
        _roomBuilder.buildRoomDetails(),
        _roomBuilder.buildRoomDetails(),
      ];
      const mockResult = success("Rooms retrieve successfully", mockRooms);

      mockRoomRepo.getAllAsync.mockResolvedValue(mockResult);

      // Act
      const result = await roomService.getAllRoomAsync();

      // Assert
      expect(mockRoomRepo.getAllAsync).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        ...mockResult,
        data: mockResult.data?.map((room) => RoomMapper.toRoomDto(room)),
      });
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(
        mockRooms.map((room) => RoomMapper.toRoomDto(room))
      );
      expect(result.message).toBe("Rooms retrieve successfully");
    });

    it("should return failure when repository throws an error", async () => {
      // Arrange
      const errorMessage = "Database connection failed";
      const expectedMessage = `Something went wrong: ${errorMessage}`;

      mockRoomRepo.getAllAsync.mockRejectedValue(new Error(errorMessage));

      // Act
      const result = await roomService.getAllRoomAsync();

      // Assert
      expect(mockRoomRepo.getAllAsync).toHaveBeenCalledTimes(1);
      expect(result.isSuccess).toBe(false);
      expect(result.data).toBeUndefined();
      expect(result.message).toBe(expectedMessage);
    });
  });

  describe("getRoomByID", () => {
    it("should return service dto when success", async () => {
      // Arrange
      const roomId = 1;
      const mockRoom = _roomBuilder.withRoomId(roomId).buildRoomDetails();
      const mockResult = success("service retrieve successfully", mockRoom);

      mockRoomRepo.getByIdAsync.mockResolvedValue(mockResult);

      // Act
      const result = await roomService.getRoomByIdAsync(roomId);

      // Assert
      expect(mockRoomRepo.getByIdAsync).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        ...mockResult,
        data: mockResult.data && RoomMapper.toRoomDto(mockResult.data),
      });
      expect(result.isSuccess).toBe(true);
      expect(result.message).toBe("service retrieve successfully");
    });

    it("should return failure when repository returns failure", async () => {
      // Arrange
      const roomId = 1;
      const mockResult = failure<RoomDetails>(
        `Room with id ${roomId} not found`
      );

      mockRoomRepo.getByIdAsync.mockResolvedValue(mockResult);

      // Act
      const result = await roomService.getRoomByIdAsync(roomId);

      // Assert
      expect(mockRoomRepo.getByIdAsync).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResult);
      expect(result.isSuccess).toBe(false);
      expect(result.message).toBe(`Room with id ${roomId} not found`);
    });

    it("should return failure when repository throws an error", async () => {
      // Arrange
      const roomId = 1;
      const errorMessage = "Database connection failed";
      const expectedMessage = `Something went wrong: ${errorMessage}`;

      mockRoomRepo.getByIdAsync.mockRejectedValue(new Error(errorMessage));

      // Act
      const result = await roomService.getRoomByIdAsync(roomId);

      // Assert
      expect(mockRoomRepo.getByIdAsync).toHaveBeenCalledTimes(1);
      expect(result.isSuccess).toBe(false);
      expect(result.data).toBeUndefined();
      expect(result.message).toBe(expectedMessage);
    });
  });
});
