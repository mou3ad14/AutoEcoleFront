// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthService } from '../authService/auth-service.service';
// import { User } from 'src/app/model/user';
// @Injectable({
//   providedIn: 'root'
// })
// export class ClientDataService {
//   private apiUrl = 'http://localhost:8083/api/v1/users/role';
//   private apiUrl1 = 'http://localhost:8083/api/v2/user/all';
//   private apiUrl2 = 'http://localhost:8083/api/v1/auth/register';
//   private apiUrlDelete = 'http://localhost:8083/api/v2/user/delete';
//   private baseUrl3 = 'http://localhost:8083/api/v1';
//   constructor(private http: HttpClient, private authService: AuthService) { }

//   getUserRoles(): Observable<string[]> {
//     console.log('Token stored:', localStorage.getItem('token'));
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${localStorage.getItem('access_token')}`
//     });
   
//     return this.http.get<string[]>(this.apiUrl, { headers });
//   }

//   private getAuthHeaders(): HttpHeaders {
//     const token = localStorage.getItem('access_token'); 
//     return new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });
//   }
//   getAgences(): Observable<any[]> {  
//     return this.http.get<any[]>(`${this.baseUrl3}/agences`, { headers: this.getAuthHeaders() });
//   }

//   getAllUsers(): Observable<User[]> {
//     const token = localStorage.getItem('access_token');  

//     if (!token) {
//       throw new Error('No access token found');
//     }

//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });

//     return this.http.get<User[]>(this.apiUrl1, { headers });
    
//   }

//   registerUser(user: User): Observable<any> {
//     const token = localStorage.getItem('access_token');

//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     });

//     return this.http.post<any>(this.apiUrl2, user, { headers });
//   }

//   deleteUserById(email: string): Observable<void> {
//     const token = localStorage.getItem('access_token');
//     if (!token) {
//       throw new Error('No access token found');
//     }

//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });

//     return this.http.delete<void>(`${this.apiUrlDelete}/${email}`, { headers });
//   }

//   GetEtatDeCaisseCda(): Observable<any> {
//     const agence = localStorage.getItem('agence');
//     const token = localStorage.getItem('access_token');
  
//     if (!token) {
//       throw new Error('No access token found');
//     }
  
//     if (!agence) {
//       throw new Error('Agence is not defined');
//     }
  
//     const today = new Date();
//     const date = today.toISOString().split('T')[0]; 
  
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });
  
//     const url = `${this.baseUrl3}/etatDeCaisse/${agence}/${date}`;
  
//     return this.http.get<any[]>(url, {
//       headers: headers
//     });
//   }
  
  
  

// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../authService/auth-service.service';
import { User } from 'src/app/model/user';
import { environment } from '../../../environment';  // Import the environment

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

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Method to get Authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Fetch user roles
  getUserRoles(): Observable<string[]> {
    console.log('Token stored:', localStorage.getItem('token'));
    const headers = this.getAuthHeaders();
    return this.http.get<string[]>(this.apiUrl, { headers });
  }

  // Fetch all agencies
  getAgences(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl3}/agences`, { headers: this.getAuthHeaders() });
  }

  // Fetch all users
  getAllUsers(): Observable<User[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<User[]>(this.apiUrl1, { headers });
  }

  // Register a new user
  registerUser(user: User): Observable<any> {
    const headers = this.getAuthHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.apiUrl2, user, { headers });
  }

  // Delete a user by email
  deleteUserById(email: string): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrlDelete}/${email}`, { headers });
  }

  // Get EtatDeCaisseCda (Cash State for CDA) for the current day
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
  
    const headers = this.getAuthHeaders();
    const url = `${this.baseUrl3}/etatDeCaisse/${agence}/${date}`;
  
    return this.http.get<any[]>(url, { headers });
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

}
