import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '@env/environment';
import { IUser, IRegisterReq, IConfirmRegister } from '@app/interfaces';


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

  public registerConfirm(data: IConfirmRegister): Observable<boolean> {
    return this.http.post<boolean>(`${API_URL}/register-confirm`, data);
  }
}
