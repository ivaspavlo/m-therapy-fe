import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '@env/environment';
import { IUser, IRegisterReq } from '@app/interfaces';
import { ILogin } from '@app/modules/lazy/auth/interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }
  
  public register(req: IRegisterReq): Observable<IUser> {
    return this.http.post<IUser>(`${API_URL}/register`, req);
  }

  public registerConfirm(token: string): Observable<boolean> {
    return this.http.get<boolean>(`${API_URL}/registerConfirm?token=${token}`);
  }

  public login(req: ILogin): Observable<boolean> {
    return this.http.post<boolean>(`${API_URL}/login`, req);
  }
}
