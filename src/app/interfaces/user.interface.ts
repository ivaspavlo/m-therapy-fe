export interface IUser {
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  address: string,
  isAdmin: string
}

export interface IUserReq {
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  address: string,
  password: string
}

export interface ILoginReq {
  email: string,
  password: string
}

export interface IRemindReq {
  email: string
}

export interface IUpdatePassword {
  password: string
}
