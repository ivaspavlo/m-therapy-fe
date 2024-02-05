import { IProduct } from "../product.interface";
import { IAd } from "./ad.interface";

export interface IContent {
  ads: IAd[],
  products: IProduct[]
}
