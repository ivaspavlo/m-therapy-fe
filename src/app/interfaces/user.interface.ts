export interface IUser {
  id: string,
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  birthday: number,
  isAdmin: boolean
}

export interface IRegisterReq {
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  birthday: number,
  password: string,
  lang: string,
  emailConsent: boolean
}
