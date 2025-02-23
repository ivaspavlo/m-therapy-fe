import { Injectable } from '@angular/core';
import { ICart } from '@app/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingManagementService {

  private _cart$ = new BehaviorSubject<ICart | null>(null);
  public cart$ = this._cart$.asObservable();

  public get cart() {
    return this._cart$.value;
  }

  public addToCart(value: ICart): void {
    this._cart$.next(value);
  }

  public resetCart(): void {
    this._cart$.next(null);
  }
}
