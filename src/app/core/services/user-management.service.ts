import { BehaviorSubject, Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { IUser } from '@app/interfaces';
import { LOCAL_STORAGE } from '../providers';
import { USER_ID, USER_NAME } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private _currentUser$ = new BehaviorSubject<IUser | null>(null);
  public currentUser$: Observable<IUser | null> = this._currentUser$.asObservable();

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: Storage
  ) { }

  public setUser(user: IUser): void {
    this.localStorage[USER_NAME] = user.firstname;
    this._currentUser$.next(user);
  }

  public isLoggedIn(): boolean {
    return !!this.localStorage.getItem(USER_NAME);
  }

  public logout(): void {
    this.localStorage.removeItem(USER_NAME);
    this.localStorage.removeItem(USER_ID);
  }
}
