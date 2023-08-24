import { ConfigService } from './types';

export const config: ConfigService = {
  port: parseInt(process.env.PORT, 10) || 3000,
};
