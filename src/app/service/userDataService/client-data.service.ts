import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../authService/auth-service.service';
import { User } from 'src/app/model/user';
@Injectable({
  providedIn: 'root'
})
export class ClientDataService {
  private apiUrl = 'http://localhost:8080/api/v1/users/role';
  private apiUrl1 = 'http://localhost:8080/api/v2/user/all';
  private apiUrl2 = 'http://localhost:8080/api/v1/auth/register';
  private apiUrlDelete = 'http://localhost:8080/api/v2/user/delete';
  private baseUrl3 = 'http://localhost:8080/api/v1';
  constructor(private http: HttpClient, private authService: AuthService) { }

  getUserRoles(): Observable<string[]> {
    console.log('Token stored:', localStorage.getItem('token'));
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });
   
    return this.http.get<string[]>(this.apiUrl, { headers });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  getAgences(): Observable<any[]> {  
    return this.http.get<any[]>(`${this.baseUrl3}/agences`, { headers: this.getAuthHeaders() });
  }

  getAllUsers(): Observable<User[]> {
    const token = localStorage.getItem('access_token');  

    if (!token) {
      throw new Error('No access token found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<User[]>(this.apiUrl1, { headers });
    
  }

  registerUser(user: User): Observable<any> {
    const token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiUrl2, user, { headers });
  }

  deleteUserById(email: string): Observable<void> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('No access token found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<void>(`${this.apiUrlDelete}/${email}`, { headers });
  }

  GetEtatDeCaisseCda(): Observable<any> {
    const agence = localStorage.getItem('agence');
    const token = localStorage.getItem('access_token');
  
    if (!token) {
      throw new Error('No access token found');
    }
  
    if (!agence) {
      throw new Error('Agence is not defined');
    }
  
    const today = new Date();
    const date = today.toISOString().split('T')[0]; 
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    const url = `${this.baseUrl3}/etatDeCaisse/${agence}/${date}`;
  
    return this.http.get<any[]>(url, {
      headers: headers
    });
  }
  
  
  

}
