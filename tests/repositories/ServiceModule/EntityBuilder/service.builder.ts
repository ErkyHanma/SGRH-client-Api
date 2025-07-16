import { Service } from "@domain/entities/ServiceModule/Service";

export class ServiceBuilder {
  private _entity = new Service(
    1, // serviceId
    "Spa", // name
    "Un Spa con muchas cosas", // description
    34, // price
    new Date("2025-01-01T10:00:00Z"), // createdAt
    1001, // createdBy
    new Date("2025-06-01T12:00:00Z"), // updatedAt
    1002, // updatedBy
    null, // deletedAt
    null, // deletedBy
    true, // isActive
    false // isDeleted
  );

  public withServiceId(serviceId: number): ServiceBuilder {
    this._entity.serviceId = serviceId;
    return this;
  }

  public build(): Service {
    return this._entity;
  }
}
