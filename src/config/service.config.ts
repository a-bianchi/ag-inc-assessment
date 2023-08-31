import { ConfigService } from './types';
import 'dotenv/config';

export const Config: ConfigService = {
  PORT: parseInt(process.env.PORT, 10) || 3000,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  TIMEOUT_AXIOS: parseInt(process.env.TIMEOUT_AXIOS, 10) || 30000,
};
