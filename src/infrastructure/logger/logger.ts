import { ILogger } from "@domain/interfaces/ILogger";
import winston from "winston";
const { combine, timestamp, printf, colorize, align } = winston.format;

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [new winston.transports.Console()],
});

export class Logger implements ILogger {
  public Info(message: any, ...meta: any[]) {
    logger.info(message, ...meta);
  }

  public Error(message: any, ...meta: any[]) {
    logger.error(message, ...meta);
  }
}
