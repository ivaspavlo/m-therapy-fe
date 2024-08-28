import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBookingSlot, IPreBooking, IResponse } from '@app/interfaces';

import { API_URL } from '@env/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingApiService {
  
  constructor(
    private http: HttpClient
  ) {}

  public getBookingSlots(fromDate?: number): Observable<IResponse<IBookingSlot[]>> {
    return this.http.get<IResponse<IBookingSlot[]>>(`${API_URL}/booking?fromDate=${fromDate || Date.now()}`);
  }

  public getPreBooking(preBookingId: string): Observable<IResponse<IPreBooking>> {
    return this.http.get<IResponse<IPreBooking>>(`${API_URL}/pre-booking?token=${preBookingId}`);
  }

  public setBooking(): Observable<any> {
    return of(null);
  }
}
