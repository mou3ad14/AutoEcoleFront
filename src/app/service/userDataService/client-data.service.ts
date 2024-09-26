import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../authService/auth-service.service';
import { User } from 'src/app/model/user';
import { environment } from '../../../environment';
import { EtatDeCaisseResponse } from 'src/app/model/EtatDeCaisseResponse';

@Injectable({
  providedIn: 'root'
})
export class ClientDataService {


  // Base URLs from environment
  private apiUrl = `${environment.apiUrl}/v1/users/role`;    // For user roles
  private apiUrl1 = `${environment.apiUrl}/v2/user/all`;     // For all users
  private apiUrl2 = `${environment.apiUrl}/v1/auth/register`; // For registering users
  private apiUrlDelete = `${environment.apiUrl}/v2/user/delete`; // For deleting users
  private baseUrl3 = `${environment.apiUrl}/v1`;  // General base URL for v1 endpoints
  private apiUrlh = 'http://http://81.0.247.161:8080/api/v1/agences';  // Adjust the URL if necessary

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getUserRoles(): Observable<string[]> {
    console.log('Token stored:', localStorage.getItem('token'));
    const headers = this.getAuthHeaders();
    return this.http.get<string[]>(this.apiUrl, { headers });
  }

  getAgences(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl3}/agences`, { headers: this.getAuthHeaders() });
  }

  getAllUsers(): Observable<User[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<User[]>(this.apiUrl1, { headers });
  }

  registerUser(user: User): Observable<any> {
    const headers = this.getAuthHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.apiUrl2, user, { headers });
  }

  deleteUserById(email: string): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrlDelete}/${email}`, { headers });
  }

  GetEtatDeCaisseCda(): Observable<EtatDeCaisseResponse> {
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

    const headers = this.getAuthHeaders();
    const url = `${this.baseUrl3}/etatDeCaisse/${agence}/${date}`;

    return this.http.get<EtatDeCaisseResponse>(url, { headers });
  }

  getSoldeAgence(): Observable<any> {
    const agence = localStorage.getItem('agence');
    const token = localStorage.getItem('access_token');

    if (!token) {
      throw new Error('No access token found');
    }

    if (!agence) {
      throw new Error('Agence is not defined');
    }

    const headers = this.getAuthHeaders();
    const url = `${this.baseUrl3}/etatDeCaisse/solde/${agence}`;

    return this.http.get<any[]>(url, { headers });
  }


  getEtatDeCaisseByAgenceAndDate(agenceId: number, date: string): Observable<any[]> {
    const headers = this.getAuthHeaders();
    const url = `${this.baseUrl3}/etatDeCaisse/${agenceId}/${date}`;
    return this.http.get<any[]>(url, { headers });
  }

  valider(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    const url = `${this.baseUrl3}/etatDeCaisse/${id}/Valider`;
    return this.http.patch<any>(url, {}, { headers });
  }

  getEtatDeCaisseByAgence(agenceId: number): Observable<any[]> {
    const headers = this.getAuthHeaders();
    const url = `${this.baseUrl3}/etatDeCaisse/solde/${agenceId}`;
    return this.http.get<any[]>(url, { headers });
  }

  getAllAgences(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlh);
  }



}
