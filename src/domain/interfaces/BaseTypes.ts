import { OperationResult } from "@domain/entities/Base/OperationResult";

export interface IBaseRepository<TEntity> {
  getAllAsync(): Promise<OperationResult<TEntity[]>>;
  getByIdAsync(id: number): Promise<OperationResult<TEntity>>;
  addAsync(entity: TEntity): Promise<OperationResult<TEntity>>;
  updateAsync(id: number, entity: TEntity): Promise<OperationResult<TEntity>>;
  deleteAsync(id: number): Promise<OperationResult<TEntity>>;
}
