import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '@env/environment';
import { IUser } from '@app/interfaces';
import { IResponse } from '@app/interfaces/api';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  public getUserById(userId: string): Observable<IResponse<IUser>> {
    return this.http.get<IResponse<IUser>>(`${API_URL}/user?id=${userId}`);
  }
}
