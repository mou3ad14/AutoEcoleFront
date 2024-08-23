// import { Injectable } from '@angular/core';
// import { HttpClient,HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ClientDataService {

// private apiUrl='http://localhost:8083/api/v1/users/role';

//    constructor(private http:HttpClient) { }

//   // getRoles() : Observable<any> {
//   //     return this.http.get<any>(`${this.apiUrl}`)
//   // }

//   getUserRoles(): Observable<string[]> {
//     const token = localStorage.getItem('token');
//     console.log(token);
//     // Or sessionStorage
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });
//     console.log(token);

//     return this.http.get<string[]>(this.apiUrl, { headers });
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../authService/auth-service.service';
@Injectable({
  providedIn: 'root'
})
export class ClientDataService {
  private apiUrl = 'http://localhost:8083/api/v1/users/role';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUserRoles(): Observable<string[]> {
    console.log('Token stored:', localStorage.getItem('token'));
    const token = localStorage.getItem('token');  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
   
    return this.http.get<string[]>(this.apiUrl, { headers });
  }
}
