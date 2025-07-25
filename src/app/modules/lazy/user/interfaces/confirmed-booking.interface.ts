import { IBookingSlot, IProduct } from '@app/interfaces';

export interface IConfirmedBooking {
  product: IProduct;
  slots: IBookingSlot[];
  email: string;
  phone: string;
  comment: string;
  date: number;
}
