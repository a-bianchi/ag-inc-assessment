import { Page } from 'puppeteer-core';
import { logger } from './logger';
import { Login } from './steps/login.steps';
import { ExecutionParameters, InfoFile, Options } from './steps/types';
import { Product } from './steps/product.steps';

export class Execute {
  private readonly loginService: Login;
  private productService: Product;
  private readonly options: Options;
  private readonly info: InfoFile;
  private readonly photos: string[];

  constructor(executionParameters: ExecutionParameters, page: Page) {
    this.loginService = new Login(executionParameters.credentials, page, executionParameters.proxy !== undefined);
    this.options = executionParameters.options;
    this.info = executionParameters.info;
    this.photos = executionParameters.photos;
  }

  public async executeSteps(): Promise<void> {
    try {
      // Login
      const page = await this.loginService.doLogin();
      // Got to add product page
      this.productService = new Product(page);
      await this.productService.doProduct();
      // To do select property type - optionals
      await this.productService.doSelectedPropertyType(this.options.propertyType);
      // To do select transaction type - optionals
      await this.productService.doSelectedTransactionType(this.options.transactionType);
      // To do select estate type - optionals
      await this.productService.doSelectedEstateType(this.options.estateType);
      // To do select payment type - optionals
      await this.productService.doSelectedPaymentType(this.options.paymentType);
      //To do complete product info
      await this.productService.doCompleteInfo(this.info);
      //To do upload images
      await this.productService.doUploadImages(this.photos);

      // To do close page
      //await page.close();

      logger.info('Execution completed');
    } catch (error) {
      logger.error(`Execute steps: ${error}`);
    }
  }
}
