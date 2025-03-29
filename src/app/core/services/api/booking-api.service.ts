import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IBookingSlot, ICart, IResponse } from '@app/interfaces';
import { API_URL } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingApiService {
  
  constructor(
    private http: HttpClient
  ) {}

  // Booking slots are independant from the product.
  public getBookingSlots(fromDate?: number): Observable<IResponse<IBookingSlot[]>> {
    return this.http.get<IResponse<IBookingSlot[]>>(`${API_URL}/booking?fromDate=${fromDate || Date.now()}`);
  }

  public book(cart: ICart): Observable<IResponse<any>> {
    return this.http.post<IResponse<any>>(`${API_URL}/booking`, cart);
  }
}
