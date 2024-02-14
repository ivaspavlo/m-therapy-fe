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
  lang: string
}

// export interface ILoginReq {
//   email: string,
//   password: string
// }

// export interface IRemindReq {
//   email: string
// }

// export interface IUpdatePassword {
//   password: string
// }
