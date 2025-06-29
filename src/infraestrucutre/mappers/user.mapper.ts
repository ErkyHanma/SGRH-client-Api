import { UserDto } from "@application/Dtos/UserManagement/UserDto";
import { User } from "@domain/entities/UserManagement/User";
import { UserModel } from "@infraestrucutre/database/schema/userManagement.schema";

export class UserMapper {
  static toUserEntity(raw: any): User {
    return new User(
      raw.userId,
      raw.firstName,
      raw.lastName,
      raw.email,
      raw.passwordHash,
      raw.roleId,
      raw.phone,
      raw.address,
      raw.createdAt,
      raw.createdBy,
      raw.updatedAt,
      raw.updatedBy,
      raw.deletedAt,
      raw.deletedBy,
      raw.isActive,
      raw.isDeleted
    );
  }

  static toUserModel(entity: User): any {
    return {
      userId: entity.userId,
      firstName: entity.firstName,
      lastName: entity.lastName,
      email: entity.email,
      passwordHash: entity.passwordHash,
      roleId: entity.roleId,
      phone: entity.phone,
      address: entity.address,
      createdAt: entity.createdAt,
      createdBy: entity.createdBy,
      updatedAt: entity.updatedAt,
      updatedBy: entity.updatedBy,
      deletedAt: entity.deletedAt,
      deletedBy: entity.deletedBy,
      isActive: entity.isActive,
      isDeleted: entity.isDeleted,
    };
  }

  static toUserDto(user: User): UserDto {
    return new UserDto(
      user.userId,
      `${user.firstName} ${user.lastName}`,
      user.email,
      user.phone,
      user.roleId
    );
  }
}
