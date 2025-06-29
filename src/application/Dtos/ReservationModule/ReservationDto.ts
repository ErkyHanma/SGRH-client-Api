export class ReservationDto {
  constructor(
    public reservationId: number,
    public clientId: number,
    public clientName: string,
    public roomId: number,
    public startDate: Date,
    public endDate: Date,
    public reservationDate: Date = new Date(),
    public status: string,
    public guestCount: number = 1,
    public paymentAmount: number
  ) {}
}
