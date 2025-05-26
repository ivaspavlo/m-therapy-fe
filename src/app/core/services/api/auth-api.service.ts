import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL_FN } from '@env/environment';
import { IRegisterReq, IRemindReq, IUpdateReq } from '@app/interfaces';
import { IResponse, ILoginRes, ILoginReq } from '@app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(
    private http: HttpClient
  ) { }
  
  public register(req: IRegisterReq): Observable<IResponse<object>> {
    return this.http.post<IResponse<object>>(API_URL_FN('register'), req);
  }

  public registerConfirm(token: string): Observable<IResponse<object>> {
    return this.http.get<IResponse<object>>(API_URL_FN(`?token=${token}`));
  }

  public login(req: ILoginReq): Observable<IResponse<ILoginRes>> {
    return this.http.post<IResponse<ILoginRes>>(API_URL_FN('login'), req);
  }

  public remind(req: IRemindReq): Observable<IResponse<object>> {
    return this.http.post<IResponse<object>>(API_URL_FN('remind'), req);
  }

  public reset(req: IUpdateReq, token: string): Observable<IResponse<object>> {
    return this.http.post<IResponse<object>>(API_URL_FN(`reset?token=${token}`), req);
  }

  public unsubscribe(token: string): Observable<IResponse<null>> {
    return this.http.delete<IResponse<null>>(API_URL_FN('/user/unsubscribe'), {body: { token }});
  }
}
