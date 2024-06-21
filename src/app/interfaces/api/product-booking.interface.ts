import { IProduct } from '../product.interface';

export interface IProductBooking {
  product: IProduct,
  dates: {start: number, end: number}[]
}
