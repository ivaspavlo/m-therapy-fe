import { Inject, Injectable } from '@angular/core';
import { IBookingSlot, ICart, IProduct, IProductBooking } from '@app/interfaces';
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

  private _currentProduct$ = new BehaviorSubject<IProduct | null>(null);
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

  public getCurrentBooking(): IProductBooking | null {
    const allBookings = this.cart?.bookings || [];
    return allBookings.find(b => b.product.id === this.currentProduct?.id) || null;
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

  public addSelectedDatesToCart(selectedSlots: IBookingSlot[]): void {
    if (!this.currentProduct) {
      return;
    }

    const currentBooking = this.getCurrentBooking() || { product: this.currentProduct as IProduct, slots: [] };
    const slotsWithDuplicates = [...currentBooking.slots, ...selectedSlots];

    // Combine selected dates with dates from the cart and remove duplicates.
    const updatedSlots = Object.values(slotsWithDuplicates.reduce<Record<number, IBookingSlot>>((acc, curr)=> {
      acc[curr.start] = curr;
      return acc;
    }, {})) as IBookingSlot[];

    const updatedBooking = {
      ...currentBooking,
      slots: updatedSlots
    };

    const updateCart = {
      // Cart might be null.
      ...(this.cart || {}),

      // Replace to the updated product booking.
      bookings: this.cart?.bookings
        ? this.cart.bookings.map(b => b.product.id === updatedBooking.product?.id ? updatedBooking : b)
        : [updatedBooking]
    }

    this.addToCart(updateCart);
  }
}
