import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL_FN } from '@env/environment';
import { IUser, IResponse, ISubscribeAdEmailsReq, IUserDetails, IUserUpdate } from '@app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(
    private http: HttpClient
  ) { }

  public getUserById(): Observable<IResponse<IUser>> {
    return this.http.get<IResponse<IUser>>(API_URL_FN('user'));
  }

  public subscribeAdEmails(req: ISubscribeAdEmailsReq): Observable<IResponse<ISubscribeAdEmailsReq>> {
    return this.http.post<IResponse<ISubscribeAdEmailsReq>>(API_URL_FN('user/subscribe'), req);
  }

  public getUserDetails(): Observable<IResponse<IUserDetails>> {
    return this.http.get<IResponse<ISubscribeAdEmailsReq>>(API_URL_FN('user/details'));
  }

  public updateUserDetails(req: IUserUpdate): Observable<IResponse<null>> {
    return this.http.put<IResponse<null>>(API_URL_FN('user'), req);
  }
}
