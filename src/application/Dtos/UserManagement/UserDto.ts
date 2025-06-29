export class UserDto {
  constructor(
    public userId: number,
    public fullName: string,
    public email: string,
    public phone: string,
    public roleId: number
  ) {}
}
