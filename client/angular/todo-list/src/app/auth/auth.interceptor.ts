import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { SpinnerService } from '../shared/services/spinner.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private spinnerService: SpinnerService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.spinnerService.showSpinner();
    if (this.authService.isLoggedIn()) {
      const jwt = localStorage.getItem('idToken');
      const cloned = request.clone({
        headers: request.headers.set('Auth', String(jwt)),
      });
      return next.handle(cloned);
    }
    return next.handle(request).pipe(
      tap((event) => console.log(event)),
      filter(
        (event: HttpEvent<any>) => event instanceof HttpResponse || !event.type
      ),
      tap(() => this.spinnerService.hideSpinner())
    );
  }
}
