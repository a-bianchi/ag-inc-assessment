import { ElementHandle, Page } from 'puppeteer-core';
import { ExecutionErrorCodes, PropertyType, TransactionType, EstateType, InfoFile } from './types';
import { logger } from '../logger';

export class Product {
  private page: Page;
  private loginUrl = 'https://www.myhome.ge/ka/my?add_product';

  constructor(page: Page) {
    this.page = page;
  }

  public async doProduct(): Promise<Page> {
    await Promise.all([this.page.waitForSelector('.header-buttons.m-0.header_register.d-flex.align-items-center.login-link')]);
    logger.info(`Navigated to add product URL: ${this.loginUrl}`);

    try {
      await this.page.click('a.header-buttons.m-0.header_register.d-flex.align-items-center.login-link');

      await this.page.waitForSelector('button[onclick="popup.close(); myproduct.add.form()"]');

      await this.page.evaluate(() => {
        const button = document.querySelector<HTMLInputElement>('button[onclick="popup.close(); myproduct.add.form()"]');
        if (button) {
          button.click();
        }
      });

      return this.page;
    } catch (error) {
      logger.error(error.message);
      const portalError = error as Error;

      if (portalError.name.toLowerCase() === 'timeouterror') {
        throw new Error(ExecutionErrorCodes.SITE_NOT_AVAILABLE.toString());
      }

      throw new Error(ExecutionErrorCodes.UNEXPECTED_ERROR.toString());
    }
  }

  public async doSelectedPropertyType(propertyTypeIndex?: number): Promise<void> {
    await this.page.waitForNavigation();

    await Promise.all([this.page.waitForSelector('#dropdownMenuButton')]);
    logger.info(`Navigated to add product URL: https://www.myhome.ge/ka/my/addProduct`);

    try {
      if (propertyTypeIndex === undefined) return;

      const propertyTypeValues = Object.values(PropertyType);
      const elements = await this.page.$$('#dropdownMenuButton');

      if (elements.length >= 2) {
        await elements[1].click();
      }
      const selector = `label.dropdown-item[for="${propertyTypeValues[propertyTypeIndex]}"]`;

      await this.page.waitForSelector(selector);
      await this.page.click(selector);
    } catch (error) {
      logger.error(error.message);
      const portalError = error as Error;

      if (portalError.name.toLowerCase() === 'timeouterror') {
        throw new Error(ExecutionErrorCodes.SITE_NOT_AVAILABLE.toString());
      }

      throw new Error(ExecutionErrorCodes.UNEXPECTED_ERROR.toString());
    }
  }

  public async doSelectedTransactionType(transactionTypeIndex?: number): Promise<void> {
    try {
      if (transactionTypeIndex === undefined) return;

      const transactionTypeValues = Object.values(TransactionType);

      await this.page.waitForSelector('#addTypes');

      await this.page.click(`label[for='${transactionTypeValues[transactionTypeIndex]}']`);
    } catch (error) {
      logger.error(error.message);
      const portalError = error as Error;

      if (portalError.name.toLowerCase() === 'timeouterror') {
        throw new Error(ExecutionErrorCodes.SITE_NOT_AVAILABLE.toString());
      }

      throw new Error(ExecutionErrorCodes.UNEXPECTED_ERROR.toString());
    }
  }

  public async doSelectedEstateType(estateTypeIndex?: number): Promise<void> {
    try {
      if (estateTypeIndex === undefined) return;

      const estateTypeValues = Object.values(EstateType);
      await this.page.waitForSelector('#estateTypes');

      const element = (await this.page.$x(`//span[contains(text(), '${estateTypeValues[estateTypeIndex]}')]`)) as ElementHandle<Element>[];

      if (element.length > 0) {
        await element[0].click();
      }

      // set conditions - hordcode
      await this.page.waitForSelector('#ConditionID_1294');
      await this.page.select('#ConditionID_1294', '1');
      await this.page.waitForSelector('#ProjectID_1295');
      await this.page.select('#ProjectID_1295', '1');
    } catch (error) {
      logger.error(error.message);
      const portalError = error as Error;

      if (portalError.name.toLowerCase() === 'timeouterror') {
        throw new Error(ExecutionErrorCodes.SITE_NOT_AVAILABLE.toString());
      }

      throw new Error(ExecutionErrorCodes.UNEXPECTED_ERROR.toString());
    }
  }

  public async doSelectedPaymentType(paymentTypeIndex?: number): Promise<void> {
    try {
      if (paymentTypeIndex === undefined) return;

      //const paymentTypeValues = Object.values(PaymentType);
      await this.page.waitForSelector('#product-item-6');
      const elementClick = await this.page.$$('#promotions1');
      const elementColor = await this.page.$('#PromBlockColor');
      const elementAutoUpdate = await this.page.$('#PromBlockAutoUpdate');

      elementClick.push(elementColor);
      elementClick.push(elementAutoUpdate);

      if (elementClick.length > 0) {
        await elementClick[paymentTypeIndex].click();
      }
    } catch (error) {
      logger.error(error.message);
      const portalError = error as Error;

      if (portalError.name.toLowerCase() === 'timeouterror') {
        throw new Error(ExecutionErrorCodes.SITE_NOT_AVAILABLE.toString());
      }

      throw new Error(ExecutionErrorCodes.UNEXPECTED_ERROR.toString());
    }
  }

  public async doCompleteInfo(infoFile: InfoFile): Promise<void> {
    try {
      // set address
      if (infoFile.address) {
        await this.page.waitForSelector('#searchfield');
        await this.page.type('#searchfield', infoFile.address);

        await this.page.waitForSelector('.list li:first-child');

        const firstElement = await this.page.$('.list li:first-child');
        if (!firstElement) return;
        await firstElement.click();
      }
      // set area
      if (infoFile.area) {
        await this.page.waitForSelector('#AreaSize_333');
        const area = infoFile?.area?.split('.')[0];
        await this.page.type('#AreaSize_333', area);
      }
      // set floors total
      if (infoFile.totalFloors) {
        await this.page.waitForSelector('#Floors_3482');
        await this.page.type('#Floors_3482', infoFile.totalFloors.toString());
      }
      // set floors flat
      if (infoFile.flatFloor) {
        await this.page.waitForSelector('#Floor_3483');
        await this.page.type('#Floor_3483', infoFile.flatFloor.toString());
      }
      // set rooms
      if (infoFile.rooms) {
        await this.page.waitForSelector('#Rooms_340');
        await this.page.select('#Rooms_340', `${infoFile.rooms}`);
      }
      // set bedrooms
      if (infoFile.bedrooms) {
        await this.page.waitForSelector('#BedRooms_342');
        await this.page.select('#BedRooms_342', `${infoFile.bedrooms}`);
      }
      // set description
      if (infoFile.description) {
        await this.page.waitForSelector('#CommentGeo');
        await this.page.$eval(
          '#CommentGeo',
          (textarea, textToSet) => {
            (textarea as HTMLTextAreaElement).value = textToSet;
          },
          infoFile.description,
        );
      }
      // set priceGel
      if (infoFile.priceGEL) {
        await this.page.$eval(
          '#Price',
          (input, priceToSet) => {
            (input as HTMLInputElement).value = priceToSet;
          },
          infoFile.priceGEL.replace(/,/g, ''),
        );
      }
      // set name
      if (infoFile.title) {
        await this.page.waitForSelector('#ProductOwner');
        await this.page.type('#ProductOwner', infoFile.productId);
      }
    } catch (error) {
      logger.error(error.message);
      const portalError = error as Error;

      if (portalError.name.toLowerCase() === 'timeouterror') {
        throw new Error(ExecutionErrorCodes.SITE_NOT_AVAILABLE.toString());
      }

      throw new Error(ExecutionErrorCodes.UNEXPECTED_ERROR.toString());
    }
  }

  public async doUploadImages(filePaths: string[]): Promise<void> {
    try {
      await this.page.waitForSelector('input[type="file"]');
      const fileInput = await this.page.$('input[type="file"]');
      await fileInput.uploadFile(...filePaths);
    } catch (error) {
      logger.error(error.message);
      const portalError = error as Error;

      if (portalError.name.toLowerCase() === 'timeouterror') {
        throw new Error(ExecutionErrorCodes.SITE_NOT_AVAILABLE.toString());
      }

      throw new Error(ExecutionErrorCodes.UNEXPECTED_ERROR.toString());
    }
  }
}
