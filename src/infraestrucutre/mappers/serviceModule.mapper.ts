import { Service } from "@domain/entities/ServiceModule/Service";

export class ServiceMapper {
  static toServiceEntity(raw: any): Service {
    return new Service(
      raw.serviceId,
      raw.name,
      raw.description,
      raw.price,
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

  static toServiceModel(entity: Service): any {
    return {
      serviceId: entity.serviceId,
      name: entity.name,
      description: entity.description,
      price: entity.price,
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
}
