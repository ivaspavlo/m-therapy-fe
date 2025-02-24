import { LANGUAGE } from '@app/core/constants';
import { IProduct } from '../product.interface';
import { IPaymentData } from './payment-data.interface';

export interface IBookingSlot {
  start: number,
  end: number
}

export interface IProductBooking {
  product: IProduct,
  dates: IBookingSlot[]
}

export interface IPreBooking {
  bookingSlots: IBookingSlot[],
  email: string,
  lang: LANGUAGE
}

export interface ICart {
  datesSelected: IBookingSlot[],
  price: number,
  paymentData: IPaymentData,
  email?: string,
  comment?: string,
  phone?: string,
  lang: LANGUAGE
}
