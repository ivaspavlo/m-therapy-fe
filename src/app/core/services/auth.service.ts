import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '@env/environment';
import { IUser, ISignupReq } from '@app/interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }
  
  public signup(data: ISignupReq): Observable<IUser> {
    return this.http.post<IUser>(`${API_URL}/auth/signup`, data);
  }

}
