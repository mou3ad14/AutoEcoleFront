// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { ClientProbable } from 'src/app/model/clientProbable';
// import { environment } from '../../../environment';  // Import the environment

// @Injectable({
//   providedIn: 'root'
// })


// export class ClientProbableService {
//   // private apiUrl = 'http://localhost:8083/api/clientprobables';

//   private apiUrl = environment.apiUrl;
//   constructor(private http: HttpClient) { }



//   private getAuthHeaders(): HttpHeaders {
//     const token = localStorage.getItem('access_token'); 
//     return new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });
//   }

//    getClientProbables(): Observable<ClientProbable[]> {
//     return this.http.get<ClientProbable[]>(this.apiUrl, { headers: this.getAuthHeaders() });
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

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getClientProbables(): Observable<ClientProbable[]> {
    const url = `${this.apiUrl}/api/clientprobables`;  
    return this.http.get<ClientProbable[]>(url, { headers: this.getAuthHeaders() });
  }
}
