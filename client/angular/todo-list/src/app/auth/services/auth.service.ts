import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { IAuth } from '../models/auth.model';
import { Observable, Subscriber } from 'rxjs';
import { APP_CONFIG } from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private url = APP_CONFIG.api.url;

  login(email: string, password: string) {
    const params = new HttpParams()
      .set('user', email)
      .set('password', password);
    return this.http
      .get<IAuth>(`${this.url}/api/login`, { ...params, withCredentials: true })
      .pipe(tap((res: IAuth) => this.setSession(res)));
  }

  healthCheck() {
    return this.http.post(`${this.url}/api/health-check`, {
      test: 'test',
    });
  }

  isLoggedIn() {
    const expiresIn = localStorage.getItem(APP_CONFIG.auth.expiresIn);
    if (expiresIn) {
      return Date.now() < Number(expiresIn);
    }
    return false;
  }

  logout() {
    localStorage.removeItem(APP_CONFIG.auth.expiresIn);
    localStorage.removeItem(APP_CONFIG.auth.idToken);
  }

  private setSession(res: IAuth) {
    const expiresIn = Date.now() + Number(res.expiresIn);
    localStorage.setItem('idToken', res.apiKey);
    localStorage.setItem('expiresIn', String(expiresIn));
  }
}
