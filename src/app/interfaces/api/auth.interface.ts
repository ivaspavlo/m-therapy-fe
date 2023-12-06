export interface ILoginReq {
  email: string;
  password: string;
}

export interface ILoginRes {
  jwtToken: string,
  id: string
}

export interface IRemindReq {
  email: string;
}

export interface IUpdateReq {
  password: string;
}
