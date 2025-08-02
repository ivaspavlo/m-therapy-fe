import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IBookingSlot, ICart, IResponse } from '@app/interfaces';
import { API_URL_FN } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingApiService {
  constructor(
    private http: HttpClient
  ) {}

  public getBookingSlots(productId: string, fromDate?: number): Observable<IResponse<IBookingSlot[]>> {
    return this.http.get<IResponse<IBookingSlot[]>>(`${API_URL_FN('booking')}?productId=${productId}&fromDate=${fromDate}`);
  }

  public book(cart: FormData): Observable<IResponse<unknown>> {
    return this.http.post<IResponse<unknown>>(API_URL_FN('booking'), cart);
  }
}
