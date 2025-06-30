export class RoomDto {
  constructor(
    public roomId: number,
    public floorNumber: number,
    public roomCategoryName: string,
    public roomCategoryDescription: string | null,
    public roomCategoryMaxCapacity: number | null,
    public roomAmenities: string | null,
    public roomImageUrl: string | null,
    public nightPrice: string
  ) {}
}
