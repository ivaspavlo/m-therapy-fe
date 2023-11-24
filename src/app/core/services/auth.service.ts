import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '@env/environment';
import { IUser, IRegisterReq } from '@app/interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }
  
  public register(data: IRegisterReq): Observable<IUser> {
    return this.http.post<IUser>(`${API_URL}/register`, data);
  }

  public registerConfirm(token: string): Observable<boolean> {
    return this.http.get<boolean>(`${API_URL}/registerConfirm?token=${token}`);
  }
}
