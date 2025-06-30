import { serviceDto } from "@application/Dtos/ServiceModule/ServiceDto";
import { UserDto } from "@application/Dtos/UserManagement/UserDto";
import { Service } from "@domain/entities/ServiceModule/Service";

export class ServiceMapper {
  static toServiceEntity(raw: any): Service {
    return new Service(
      raw.service_id,
      raw.name,
      raw.description,
      raw.price,
      raw.created_at,
      raw.created_by,
      raw.updated_at,
      raw.updated_by,
      raw.deleted_at,
      raw.deleted_by,
      raw.is_active,
      raw.is_deleted
    );
  }

  static toServiceModel(entity: Service): any {
    return {
      service_id: entity.serviceId,
      name: entity.name,
      description: entity.description,
      price: entity.price,
      created_at: entity.createdAt,
      created_by: entity.createdBy,
      updated_at: entity.updatedAt,
      updated_by: entity.updatedBy,
      deleted_at: entity.deletedAt,
      deleted_by: entity.deletedBy,
      is_active: entity.isActive,
      is_deleted: entity.isDeleted,
    };
  }

  static toDto(entity: Service): serviceDto {
    return new serviceDto(
      entity.serviceId,
      entity.name,
      entity.description,
      entity.price
    );
  }
}
