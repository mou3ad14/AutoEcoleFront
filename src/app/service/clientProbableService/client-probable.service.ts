import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientProbable } from 'src/app/model/clientProbable';

@Injectable({
  providedIn: 'root'
})


export class ClientProbableService {
  private apiUrl = 'http://localhost:8084/api/clientprobables';
  constructor(private http: HttpClient) { }



  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

   getClientProbables(): Observable<ClientProbable[]> {
    return this.http.get<ClientProbable[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }
}
