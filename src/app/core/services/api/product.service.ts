import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse, IProduct } from '@app/interfaces';
import { API_URL } from '@env/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor(
    private http: HttpClient
  ) { }

  public getProducts(): Observable<IResponse<IProduct[]>> {
    return this.http.get<IResponse<IProduct[]>>(`${API_URL}/product`);
  }
}
