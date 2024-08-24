import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBookingSlot, IResponse } from '@app/interfaces';

import { API_URL } from '@env/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(
    private http: HttpClient
  ) {}

  public getBookingSlots(fromDate?: number): Observable<IResponse<IBookingSlot[]>> {
    return this.http.get<IResponse<IBookingSlot[]>>(`${API_URL}/booking?fromDate=${fromDate || Date.now()}`);
  }

  public getPreBooking(preBookingId: string): Observable<IResponse<any>> {
    return this.http.get<IResponse<any>>(`${API_URL}/pre-booking/${preBookingId}`);
  }

  public setBooking(): Observable<any> {
    return of(null);
  }
}
