import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_URL } from '@env/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(
    private http: HttpClient
  ) {}

  public getProduct(productId: string): any {
    // start here https://stackoverflow.com/questions/42992212/in-angular-what-is-pathmatch-full-and-what-effect-does-it-have
    return of({

    });
    // this.http.get(`${API_URL}/product/${productId}`);
  }

}
