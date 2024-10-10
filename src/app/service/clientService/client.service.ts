
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../model/client';
import { environment } from '../../../environment'; 

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = `${environment.apiUrl}/clients`;   
  private baseUrl3 = `${environment.apiUrl}/v1`;     

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token'); 
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json' 
    });
  }

  searchClients(nom?: string, prenom?: string): Observable<Client[]> {
    let params = new HttpParams();
    if (nom) params = params.append('nom', nom);
    if (prenom) params = params.append('prenom', prenom);
    
    return this.http.get<Client[]>(`${this.apiUrl}/searchNomPrenom`, { 
      params: params,
      headers: this.getAuthHeaders()
    });
  }

  getClients(page: number, size: number, sort: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (sort) {
      params = params.set('sort', sort);
    }

    return this.http.get<any>(this.apiUrl, { 
      headers: this.getAuthHeaders(), 
      params: params 
    });
  }

  getClientById(cin: string): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${cin}`, { headers: this.getAuthHeaders() });
  }

  getAgenceById(idAgence: string):Observable<any> {
    return this.http.get<any>(`${this.baseUrl3}/agences/${idAgence}`, { headers: this.getAuthHeaders() });
  }

  addSeancePratiqueToClient(cin: string, seancePratique: string): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${cin}/seances-pratiques`, seancePratique, { headers: this.getAuthHeaders() });
  }

  updateClient(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, client, { headers: this.getAuthHeaders() });
  }

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client, { headers: this.getAuthHeaders() });
  }

  getAgences(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl3}/agences`, { headers: this.getAuthHeaders() });
  }

  addPaiementToClient(clientId: number, montant: number, agence: number): Observable<any> {
    const paiement = {
      montant: montant,
      heurePaiement: new Date().toISOString() 
    };

    return this.http.post(`${this.apiUrl}/${clientId}/${agence}/paiements`, JSON.stringify(paiement)
    , { headers: this.getAuthHeaders() });
  }

  addSeanceTheoriqueToClient(clientCin: string): Observable<any> {
    const seanceTheoriqueRequest = {
      seanceTheorique: new Date().toISOString()
    };
    return this.http.put(`${this.apiUrl}/${clientCin}/seances-theoriques`, seanceTheoriqueRequest,
      { headers: this.getAuthHeaders() });
  }

  addExamenTheoriqueToClient(clientCin: string, dateExamTheorique: string): Observable<any> {
    const params = new HttpParams().set('dateExamTheorique', dateExamTheorique);
    return this.http.put(`${this.apiUrl}/${clientCin}/examen-theorique`, null, {
      headers: this.getAuthHeaders(),
      params: params
    });
}


  addExamenPratiqueToClient(clientCin: string,  dateExamPratique : string): Observable<any> {
    const params = new HttpParams().set('dateExamPratique', dateExamPratique);

    return this.http.put(`${this.apiUrl}/${clientCin}/examen-pratique`, null,{
      headers: this.getAuthHeaders(),
      params: params
    });
  } 

   
}
