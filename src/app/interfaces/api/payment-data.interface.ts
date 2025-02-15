export interface IPaymentCard {
  label: string;
  card: string;
}

export interface IPaymentData {
  cards: IPaymentCard[]
}
