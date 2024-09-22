// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { ClientProbable } from 'src/app/model/clientProbable';
// import { environment } from '../../../environment';  

// @Injectable({
//   providedIn: 'root'
// })
// export class ClientProbableService {
//   private apiUrl = environment.apiUrl;  

//   constructor(private http: HttpClient) { }

//   private getAuthHeaders(): HttpHeaders {
//     const token = localStorage.getItem('access_token'); 
//     return new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });
//   }

//   getClientProbables(): Observable<ClientProbable[]> {
//     const url = `${this.apiUrl}/clientprobables`;  
//     return this.http.get<ClientProbable[]>(url, { headers: this.getAuthHeaders() });
//   }
// }


 import { HttpClient, HttpHeaders } from '@angular/common/http';
 import { Injectable } from '@angular/core';
 import { Observable } from 'rxjs';
 import { ClientProbable } from 'src/app/model/clientProbable';
import { environment } from '../../../environment';


@Injectable({
  providedIn: 'root'
})
export class ClientProbableService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Fetch all probable clients
  getClientProbables(): Observable<ClientProbable[]> {
    const url = `${this.apiUrl}/clientprobables`;
    return this.http.get<ClientProbable[]>(url, { headers: this.getAuthHeaders() });
  }

  // Fetch client probable by ID
  getClientProbableById(id: number): Observable<ClientProbable> {
    const url = `${this.apiUrl}/clientprobables/${id}`;
    return this.http.get<ClientProbable>(url, { headers: this.getAuthHeaders() });
  }

  // Create a new client probable
  createClientProbable(client: ClientProbable): Observable<ClientProbable> {
    const url = `${this.apiUrl}/clientprobables`;
    return this.http.post<ClientProbable>(url, client, { headers: this.getAuthHeaders() });
  }

// client-probable.service.ts
  updateClientProbable(id: number, clientProbable: ClientProbable): Observable<ClientProbable> {
  const url = `${this.apiUrl}/clientprobables/${id}`; // Ensure the correct endpoint
  return this.http.put<ClientProbable>(url, clientProbable, { headers: this.getAuthHeaders() });
}

}

