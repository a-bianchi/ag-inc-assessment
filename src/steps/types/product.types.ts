export enum PropertyType {
  APARTMENT_IN_BUILDING = 'ProductTypeID_284',
  HOUSE_AND_YARD = 'ProductTypeID_285',
  COMMERCIAL_AREA = 'ProductTypeID_286',
  LAND_PLOT = 'ProductTypeID_287',
  HOTEL = 'ProductTypeID_288',
}

export enum TransactionType {
  FOR_SALE = 'AdTypeID_290',
  FOR_RENT = 'AdTypeID_291',
  FOR_LEASE = 'AdTypeID_329',
  FOR_RENT_DAILY = 'AdTypeID_407',
}

export enum EstateType {
  OLD_BUILDING = 'ძველი აშენებული',
  NEW_BUILDING = 'ახალი აშენებული',
  UNDER_CONSTRUCTION = 'მშენებარე',
}

export enum PaymentType {
  SUPER_VIP = 'promotions1,20',
  VIP_PLUS = 'promotions1,15',
  VIP = 'promotions1,10',
  ADD_COLOR = 'PromBlockColor,5',
  AUTOMATIC_UPDATE = 'PromBlockAutoUpdate,2',
}

export interface InfoFile {
  title: string;
  address: string;
  productId: string;
  priceUSD: string;
  priceGEL: string;
  bedrooms: number;
  rooms: number;
  area: string;
  description: string;
  location: Location;
  flatFloor: number;
  totalFloors: number;
}

export interface Location {
  lat: number;
  lng: number;
}
