import { InfoFile } from './product.types';

export type ExecutionParameters = {
  credentials: Credentials;
  proxy?: Proxy;
  options?: Options;
  info: InfoFile;
  photos: string[];
};

export type Proxy = {
  country: string;
  url: string;
  username: string;
  password: string;
  port: number;
};

export type Credentials = {
  email: string;
  password: string;
  phone?: string;
};

export type Options = {
  propertyType?: number;
  transactionType?: number;
  estateType?: number;
  paymentType?: number;
};
