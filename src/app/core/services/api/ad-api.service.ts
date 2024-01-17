import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IResponse, IAd } from "@app/interfaces";
import { API_URL } from "@env/environment";


@Injectable({
  providedIn: 'root'
})
export class AdApiService {

  constructor(
    private http: HttpClient
  ) { }

  public getAds(): Observable<IResponse<IAd[]>> {
    return this.http.get<IResponse<IAd[]>>(`${API_URL}/ad`);
  }
}