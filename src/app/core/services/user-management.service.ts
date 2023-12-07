import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IUser } from '@app/interfaces';


@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private _currentUser$ = new BehaviorSubject<IUser | null>(null);
  public currentUser$: Observable<IUser | null> = this._currentUser$.asObservable();

  constructor() { }

  public setUser(user: IUser): void {
    this._currentUser$.next(user);
  }

}
