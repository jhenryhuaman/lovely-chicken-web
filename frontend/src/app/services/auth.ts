import { Service, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

@Service()
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:9494/api/auth';

  private readonly tokenKey = 'lovely_token';

  readonly authenticated = signal(!!localStorage.getItem(this.tokenKey));

  login(username: string, password: string): Observable<LoginResponse> {
    const request: LoginRequest = {
      username,
      password,
    };

    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request).pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, response.token);

        this.authenticated.set(true);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);

    this.authenticated.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
