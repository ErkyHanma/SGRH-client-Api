export interface OperationResult<T> {
  isSuccess: boolean;
  message: string;
  data?: T;
}

export function success<T>(message: string, data?: T): OperationResult<T> {
  return { isSuccess: true, message, data };
}

export function failure<T>(message: string): OperationResult<T> {
  return { isSuccess: false, message };
}
