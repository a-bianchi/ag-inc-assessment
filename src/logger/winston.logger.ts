import winston from 'winston';
import { Config } from '../config';

export const logger = winston.createLogger({
  level: Config.LOG_LEVEL,
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});
