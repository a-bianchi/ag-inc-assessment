import puppeteer, { LaunchOptions } from 'puppeteer-core';
import { logger } from './logger';
import { PuppeteerConfig } from './config';
import { ExecutionParameters, Proxy } from './steps/types';
import { Execute } from './execute';

export class Handler {
  private readonly proxy: Proxy;
  private readonly executionParameters: ExecutionParameters;

  constructor(parameters: ExecutionParameters) {
    this.proxy = parameters.proxy;
    this.executionParameters = parameters;
  }

  public async execute(launchOptions: LaunchOptions): Promise<void> {
    try {
      const browser = await puppeteer.launch(launchOptions);

      const page = (await browser.pages())[0];

      let defaultTimeout = PuppeteerConfig.DEFAULT_PAGE_TIMEOUT;

      if (this.proxy) {
        logger.info('Authenticanting proxy.');

        await page.authenticate({
          username: this.proxy.username,
          password: this.proxy.password,
        });

        defaultTimeout = PuppeteerConfig.PROXY_PAGE_TIMEOUT;
      }

      page.setDefaultTimeout(defaultTimeout);

      const execute = new Execute(this.executionParameters, page);

      await execute.executeSteps();
    } catch (error) {
      logger.error(`Handler execute steps: ${error}`);
    }
  }
}
