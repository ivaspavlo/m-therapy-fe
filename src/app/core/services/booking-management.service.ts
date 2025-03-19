import { Inject, Injectable } from '@angular/core';
import { ICart, IProductBooking } from '@app/interfaces';
import { BehaviorSubject } from 'rxjs';
import { LOCAL_STORAGE } from '../providers';
import { CART } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class BookingManagementService {

  private _cart$ = new BehaviorSubject<ICart | null>(null);
  public cart$ = this._cart$.asObservable();
  public get cart() {
    return this._cart$.value;
  }

  // Includes current product and all the timeslots available.
  private _currentProduct$ = new BehaviorSubject<IProductBooking | null>(null);
  public currentProduct$ = this._currentProduct$.asObservable();
  public get currentProduct() {
    return this._currentProduct$.value;
  }

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: Storage
  ) {
    const savedCart = this.localStorage.getItem(CART);
    this._cart$.next(savedCart ? JSON.parse(savedCart) : null);
  }

  // Returns timeslots selected.
  public get currentBookings(): IProductBooking | null {
    if (this.cart === null || !this.currentProduct === null) {
      return null;
    }
    return this.cart.bookings.find((i) => i.product.id === this.currentProduct?.product.id) || null;
  }

  public addToCart(value: ICart): void {
    this.localStorage.setItem(CART, JSON.stringify(value));
    this._cart$.next(value);
  }

  public resetCart(): void {
    this.localStorage.removeItem(CART);
    this._cart$.next(null);
  }

  public setCurrentProduct(product: IProductBooking) {
    this._currentProduct$.next(product);
  }
}
