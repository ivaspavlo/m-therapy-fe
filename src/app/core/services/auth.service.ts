import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '@env/environment';
import { ILoginReq, IRegisterReq } from '@app/interfaces';
import { IResponse, ILoginRes } from '@app/interfaces/api';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }
  
  public register(req: IRegisterReq): Observable<IResponse<object>> {
    return this.http.post<IResponse<object>>(`${API_URL}/register`, req);
  }

  public registerConfirm(token: string): Observable<boolean> {
    return this.http.get<boolean>(`${API_URL}/registerConfirm?token=${token}`);
  }

  public login(req: ILoginReq): Observable<IResponse<ILoginRes>> {
    return this.http.post<IResponse<ILoginRes>>(`${API_URL}/login`, req);
  }
}
