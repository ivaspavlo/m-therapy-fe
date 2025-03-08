import { IProduct } from '../product.interface';
import { IAd } from './ad.interface';
import { IContact } from './contact.interface';
import { IPaymentCard } from './payment-data.interface';

export interface IContent {
  ads: IAd[],
  products: IProduct[],
  contacts: IContact[],
  paymentCards: IPaymentCard[]
}
