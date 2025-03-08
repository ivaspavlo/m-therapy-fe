import { LANGUAGE } from '@app/core/constants';
import { IProduct } from '../product.interface';
import { IPaymentCard } from './payment-data.interface';

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
  product: IProduct,
  email?: string,
  comment?: string,
  phone?: string,
  lang: LANGUAGE
}
