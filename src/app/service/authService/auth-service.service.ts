import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environment';  


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  
  private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/v1/auth/authenticate`, { email, password }).pipe(
      tap(response => {
        // Store the tokens in localStorage
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        localStorage.setItem('role', response.role);
        localStorage.setItem('agence', response.agence);
      })
    );
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/v1/auth/register`, user);
  }

  refreshToken(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/v1/auth/refresh-token`, {});
  }

  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
