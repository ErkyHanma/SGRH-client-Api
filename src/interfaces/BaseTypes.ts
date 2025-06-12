export interface OperationResult {
  success: boolean;
  message?: string;
  data?: any;
}

export interface IBaseRepository<TEntity> {
  getAllAsync(): Promise<OperationResult>;
  getByIdAsync(id: number): Promise<OperationResult>;
  addAsync(entity: TEntity): Promise<OperationResult>;
  updateAsync(entity: TEntity): Promise<OperationResult>;
  deleteAsync(entity: TEntity): Promise<OperationResult>;
  getAllAsync(filter: (entity: TEntity) => boolean): Promise<OperationResult>;
  existsAsync(filter: (entity: TEntity) => boolean): Promise<boolean>;
}

