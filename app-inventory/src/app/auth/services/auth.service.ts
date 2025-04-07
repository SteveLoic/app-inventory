import { HttpClient } from '@angular/common/http';
import { EventEmitter, inject, Injectable } from '@angular/core';
import { PersistanceService } from '../../shared/services/persistance.service';
import { LoginRequestInterface } from '../types/login.request.interface';
import { Observable } from 'rxjs';
import { AuthResponseInterface } from '../types/auth.response.interface';
import { RegisterRequestInterface } from '../types/register.request.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static BASE_URL = 'http://localhost:5051/api/v1';
  authStatusChanged = new EventEmitter<void>();

  http = inject(HttpClient);
  persistanceService = inject(PersistanceService);

  login(request: LoginRequestInterface): Observable<AuthResponseInterface> {
    return this.http.post<AuthResponseInterface>(
      `${AuthService.BASE_URL}/auth/login`,
      request
    );
  }

  register(
    request: RegisterRequestInterface
  ): Observable<AuthResponseInterface> {
    return this.http.post<AuthResponseInterface>(
      `${AuthService.BASE_URL}/auth/register`,
      request
    );
  }

  getLoggedInUserInfo(): Observable<any> {
    return this.http.get<any>(`${AuthService.BASE_URL}/users/current/user`);
  }
}
