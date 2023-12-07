import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ACCESS_TOKEN, CORE_ROUTE_NAMES } from '../constants';
import { LOCAL_STORAGE } from '../providers';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: Storage,
    private router: Router
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.localStorage.get(ACCESS_TOKEN);
    if (token) {
      request = this.addToken(request, token);
    }
    return next.handle(request).pipe(
      tap(() => {
        debugger;
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          // this.authService.logout();
          this.router.navigateByUrl(CORE_ROUTE_NAMES.AUTH);
        }
        return throwError(err);
      })
    );
  }

  private addToken<T>(request: HttpRequest<T>, token: any): HttpRequest<T> {
    return request.clone({
      setHeaders: { 'Authorization': `Token ${token}` }
    });
  }

}
