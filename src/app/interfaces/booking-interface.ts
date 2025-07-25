import { LANGUAGE } from "@app/core/constants";
import { IProduct } from "./product.interface";
import { IBookingSlot } from "./api/booking.interface";

export interface IProductBooking {
  product: IProduct;
  slots: IBookingSlot[];
}

export interface ICart {
  bookings: IProductBooking[];
  paymentFile?: FormData;
  lang?: LANGUAGE;
  email?: string;
  comment?: string;
  phone?: string;
}

export interface ICartTotals {
  slotsQty: number;
  price: number;
}
