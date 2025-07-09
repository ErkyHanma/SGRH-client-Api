export interface ILogger {
  Info(message: string): void;
  Info(message: string, ...meta: any[]): void;
  Error(message: any): void;
  Error(message: string, ...meta: any[]): void;
}
