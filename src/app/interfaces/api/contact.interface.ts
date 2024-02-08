export enum CONTACT_TYPE {
  MOBILE = 'MOBILE',
  VIBER = 'VIBER',
  TELEGRAM = 'TELEGRAM'
}

export interface IContact {
  type: CONTACT_TYPE,
  value: string
}
