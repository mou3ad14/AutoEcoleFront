import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
 
  private apiUrl = 'http://localhost:8084/api/clients';
  private baseUrl3 = 'http://localhost:8084/api/v1';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token'); 
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }
  

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}`, { headers: this.getAuthHeaders() });
  }

  getClientById(cin: string): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${cin}`,{ headers: this.getAuthHeaders() });
  }

  addSeancePratiqueToClient(cin: string, seancePratique: string): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${cin}/seances-pratiques`, seancePratique,{ headers: this.getAuthHeaders() });
  }

  updateClient(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, client,{ headers: this.getAuthHeaders() });
  }
  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}`, client, { headers: this.getAuthHeaders() });
  }


  getAgences(): Observable<any[]> {  
    return this.http.get<any[]>(`${this.baseUrl3}/agences`, { headers: this.getAuthHeaders() });
  }
}
