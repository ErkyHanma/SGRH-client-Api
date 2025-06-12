import { Floor } from "@entities/Hotel/Floor";
import { Rate } from "@entities/Hotel/Rate";
import { Room } from "@entities/Hotel/Room";
import { RoomCategory } from "@entities/Hotel/RoomCategory";
import { Season } from "@entities/Hotel/Season";
import { IBaseRepository } from "@interfaces/BaseTypes";

// Repositories
export interface IFloorRepository extends IBaseRepository<Floor> {}
export interface IRateRepository extends IBaseRepository<Rate> {}
export interface IRoomRepository extends IBaseRepository<Room> {}
export interface IRoomCategoryRepository
  extends IBaseRepository<RoomCategory> {}
export interface ISeasonRepository extends IBaseRepository<Season> {}
