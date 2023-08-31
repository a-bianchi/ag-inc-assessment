import { ConfigPuppeteer } from './types';
import 'dotenv/config';

export const PuppeteerConfig: ConfigPuppeteer = {
  HEADLESS: process.env.HEADLESS === 'true' || false,
  DEFAULT_PAGE_TIMEOUT: parseInt(process.env.DEFAULT_PAGE_TIMEOUT || '30000'),
  PROXY_PAGE_TIMEOUT: parseInt(process.env.PROXY_PAGE_TIMEOUT || '60000'),
  PUPPETEER_EXECUTABLE_PATH: process.env.PUPPETEER_EXECUTABLE_PATH || '',
};
