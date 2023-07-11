import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CoreStorageService } from '../services';
import { ACCESS_TOKEN, CORE_ROUTE_NAMES } from '../constants';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private storage: CoreStorageService,
    // private authService: AuthService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storage.get(ACCESS_TOKEN);
    if (token) {
      request = this.addToken(request, token);
    }
    return next.handle(request).pipe(
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
