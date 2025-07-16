import { User } from "@domain/entities/UserManagement/User";

export class UserBuilder {
  private _entity = new User(
    1, // userId
    "Jane", // firstName
    "Doe", // lastName
    "janedoe@gmail.com", // email
    "$2b$10$abc123hashedpass", // passwordHash
    2, // roleId
    "+1-555-123-4567", // phone
    "456 Elm Street, Cityville", // address
    new Date("2024-01-01T10:00:00Z"), // createdAt
    1001, // createdBy
    new Date("2024-06-01T12:00:00Z"), // updatedAt
    1002, // updatedBy
    null, // deletedAt
    null, // deletedBy
    true, // isActive
    false // isDeleted
  );

  public withUserId(userId: number): UserBuilder {
    this._entity.userId = userId;
    return this;
  }

  public withEmail(userEmail: string): UserBuilder {
    this._entity.email = userEmail;
    return this;
  }

  public build(): User {
    return this._entity;
  }
}
