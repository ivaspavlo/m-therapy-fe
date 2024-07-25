import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBookingSlot, IProductBooking } from '@app/interfaces';

import { API_URL } from '@env/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(
    private http: HttpClient
  ) {}

  public getProduct(productId: string): Observable<IProductBooking> {
    console.log('productId', productId);
    return of({
      product: {
        'id': '1',
        'title': 'Test1',
        'price': 1000,
        'createdAt': 1708427169311,
        'desc': 'Test test test test test test test test test test test test',
        'imgUrl': 'https://firebasestorage.googleapis.com/v0/b/mt-stage-db6be.appspot.com/o/test.png?alt=media&token=738df6d7-4b6f-4bb5-bf1a-d683dac512dc'
      },
      dates: [
        {start: 1718865725252, end: 1718866505252},
        {start: 1718865725252, end: 1718866505252},
        {start: 1718865725252, end: 1718866505252},
        {start: 1718865725252, end: 1718866505252},
        {start: 1718865725252, end: 1718866505252},
        {start: 1718865725252, end: 1718866505252},
        {start: 1718865725252, end: 1718866505252},
        {start: 1718865725252, end: 1718866505252},
        {start: 1718865725252, end: 1718866505252},
        {start: 1718865725252, end: 1718866505252},
        {start: 1718865725252, end: 1718866505252}
      ]
    });
    // this.http.get<IProductBooking>(`${API_URL}/product/${productId}`);
  }

  public getBookingSlots(fromDate?: number): Observable<IBookingSlot[]> {
    return this.http.get<IBookingSlot[]>(`booking?fromDate=${fromDate || Date.now()}`);
  }
}
