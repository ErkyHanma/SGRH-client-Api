import { Floor } from "@domain/entities/Hotel/Floor";
import { Rate } from "@domain/entities/Hotel/Rate";
import { Room } from "@domain/entities/Hotel/Room";
import { RoomCategory } from "@domain/entities/Hotel/RoomCategory";
import { Season } from "@domain/entities/Hotel/Season";
import { IBaseRepository } from "@domain/interfaces/BaseTypes";

// Repositories
export interface IFloorRepository extends IBaseRepository<Floor> {}
export interface IRateRepository extends IBaseRepository<Rate> {}
export interface IRoomRepository extends IBaseRepository<Room> {}
export interface IRoomCategoryRepository
  extends IBaseRepository<RoomCategory> {}
export interface ISeasonRepository extends IBaseRepository<Season> {}
