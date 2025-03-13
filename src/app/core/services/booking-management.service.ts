import { Inject, Injectable } from '@angular/core';
import { ICart, IProduct } from '@app/interfaces';
import { BehaviorSubject } from 'rxjs';
import { LOCAL_STORAGE } from '../providers';
import { CART } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class BookingManagementService {

  private _cart$ = new BehaviorSubject<ICart | null>(null);
  public cart$ = this._cart$.asObservable();

  private _currentProduct$ = new BehaviorSubject<IProduct | null>(null);
  public currentProduct$ = this._cart$.asObservable();
  public get currentProduct() {
    return this._currentProduct$.value;
  }

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: Storage
  ) {
    const savedCart = this.localStorage.getItem(CART);
    this._cart$.next(savedCart ? JSON.parse(savedCart) : null);
  }

  public get cart() {
    return this._cart$.value;
  }

  public addToCart(value: ICart): void {
    this.localStorage.setItem(CART, JSON.stringify(value));
    this._cart$.next(value);
  }

  public resetCart(): void {
    this.localStorage.removeItem(CART);
    this._cart$.next(null);
  }

  public setCurrentProduct(product: IProduct) {
    this._currentProduct$.next(product);
  }
}
