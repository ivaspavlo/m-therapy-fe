import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IResponse } from "@app/interfaces";
import { API_URL } from "@env/environment";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AdApiService {

  constructor(
    private http: HttpClient
  ) { }

  public getUserById(): Observable<IResponse<any>> {
    return this.http.get<IResponse<any>>(`${API_URL}/ad`);
  }
}