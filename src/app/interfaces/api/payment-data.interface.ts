export interface IPaymentCard {
  name: string;
  uiName: string;
  number: string;
}

export interface IPaymentData {
  cards: IPaymentCard[]
}
