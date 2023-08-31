import { Page } from 'puppeteer-core';
import { Credentials, ExecutionErrorCodes } from './types';
import { logger } from '../logger';

export class Login {
  private credentials: Credentials;
  private page: Page;
  private hasProxy: boolean;
  private loginUrl = 'https://auth.tnet.ge/ka/user/login?Continue=https%3A%2F%2Fwww.myhome.ge%2Fka%2F';

  constructor(credentials: Credentials, page: Page, hasProxy: boolean) {
    this.credentials = credentials;
    this.page = page;
    this.hasProxy = hasProxy;
  }

  public async doLogin(): Promise<Page> {
    // expand page viewport for easier navigation in the next steps
    await this.page.setViewport({
      width: 1280,
      height: 720,
    });

    this.page
      .goto(this.loginUrl, { waitUntil: 'networkidle2' })
      .catch((error) => logger.debug('Unexpected error with login Url navigation: ', error));

    await this.page.waitForNavigation();

    await Promise.all([
      this.page.waitForSelector('.gradient-button.w-100.border-0.my-22px.text-white.py-3.transition-all'),
      this.page.waitForSelector('#Email'),
      this.page.waitForSelector('#Password'),
      this.page.waitForSelector('.gradient-button.w-100.border-0.text-white.py-3.transition-all'),
    ]);
    logger.info(`Navigated to login URL: ${this.loginUrl}`);

    try {
      await this.submitLoginPromise(this.page, this.credentials, this.hasProxy);

      return this.page;
    } catch (error) {
      logger.error(error.message);
      const portalError = error as Error;

      if (portalError.name.toLowerCase() === 'timeouterror') {
        throw new Error(ExecutionErrorCodes.SITE_NOT_AVAILABLE.toString());
      }

      if (portalError.message.toLocaleLowerCase().includes('login error: 409')) {
        throw new Error(ExecutionErrorCodes.INVALID_CREDENTIALS.toString());
      }

      throw new Error(ExecutionErrorCodes.UNEXPECTED_ERROR.toString());
    }
  }

  private async submitLoginPromise(page: Page, credentials: Credentials, hasProxy: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      const { email, password } = credentials;
      // Listen page 'response' to detect login result response
      page.on('response', async function interceptLoginResponse(interceptedResponse) {
        if (!/.+?\/user\/auth$/.test(interceptedResponse.url())) {
          // Not login URL response, ignore
          return;
        }

        page.off('response', interceptLoginResponse);
        const status = interceptedResponse.status();

        if (status !== 200) {
          try {
            const responseBody = await interceptedResponse.json();
            return reject(new Error(`Login error: ${status} - ${JSON.stringify(responseBody)}`));
          } catch {
            return reject(new Error(`Login error: ${status}`));
          }
        }

        // status === 200 => login success!
        resolve();
      });

      // setup a max timeout to prevent hangups in case of an unexpected error.
      const loginPromiseTimeout = 15000;
      setTimeout(() => {
        const errMsg = `Login response interceptor timeout after ${loginPromiseTimeout}ms`;
        reject(new Error(errMsg));
      }, loginPromiseTimeout);

      // submit login credentials
      return page
        .evaluate(
          (email, password, hasProxy) => {
            const intervalMs = hasProxy ? 5000 : 100;

            setTimeout(function trySubmitLogin() {
              const [$email, $password, $submitBtn] = [
                document.querySelector<HTMLInputElement>('#Email'),
                document.querySelector<HTMLInputElement>('#Password'),
                document.querySelector<HTMLButtonElement>('.gradient-button.w-100.border-0.text-white.py-3.transition-all'),
              ];
              if ([$email, $password, $submitBtn].some(($el) => $el === null)) {
                setTimeout(trySubmitLogin, intervalMs);
                return;
              }
              $email.value = email;
              $password.value = password;
              $submitBtn.click();
            }, intervalMs);
          },
          email,
          password,
          hasProxy,
        )
        .then(() => {
          logger.info(`Login credentials submitted, waiting for result...`);
          return page.waitForNavigation();
        })
        .catch(reject);
    });
  }
}
