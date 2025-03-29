import { LANGUAGE } from '@app/core/constants';
import { IProduct } from '../product.interface';

export interface IBookingSlot {
  start: number,
  end: number
}

export interface IProductBooking {
  product: IProduct,
  slots: IBookingSlot[]
}

export interface ICart {
  bookings: IProductBooking[],
  paymentFile?: FormData,
  lang?: LANGUAGE,
  email?: string,
  comment?: string,
  phone?: string
}
