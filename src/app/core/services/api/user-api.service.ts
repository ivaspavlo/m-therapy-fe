import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '@env/environment';
import { IUser, IResponse, ISubscribeAdEmailsReq, IUserDetails } from '@app/interfaces';


@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(
    private http: HttpClient
  ) { }

  public getUserById(): Observable<IResponse<IUser>> {
    return this.http.get<IResponse<IUser>>(`${API_URL}/user`);
  }

  public subscribeAdEmails(req: ISubscribeAdEmailsReq): Observable<IResponse<ISubscribeAdEmailsReq>> {
    return this.http.post<IResponse<ISubscribeAdEmailsReq>>(`${API_URL}/user/subscribe`, req);
  }

  public getUserDetails(): Observable<IResponse<IUserDetails>> {
    return this.http.get<IResponse<ISubscribeAdEmailsReq>>(`${API_URL}/user/details`);
  }
}
