import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '@env/environment';
import { IUser, IResponse, ISubscribeAdEmailsReq } from '@app/interfaces';


@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(
    private http: HttpClient
  ) { }

  public getUserById(userId: string): Observable<IResponse<IUser>> {
    return this.http.get<IResponse<IUser>>(`${API_URL}/user`);
  }

  public subscribeAdEmails(req: ISubscribeAdEmailsReq): Observable<IResponse<null>> {
    return this.http.put<IResponse<null>>(`${API_URL}`, req);
  }
}
