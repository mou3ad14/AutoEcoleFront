import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientDataService } from '../service/userDataService/client-data.service';

@Component({
  selector: 'app-etat-de-caisse-list',
  templateUrl: './etat-de-caisse-list.component.html',
  styleUrls: ['./etat-de-caisse-list.component.css']
})
export class EtatDeCaisseListComponent implements OnInit {
  etatDeCaisseList: any[] = []; // Define the array to hold the fetched data
  agence: number | null = null;
  todayDate: string = '';
  solde: number = 0;

  constructor(private http: HttpClient,     private clientDataService: ClientDataService,  ) {}

  ngOnInit(): void {
      this.fetchEtatDeCaisse();
      this.fetchSolde();
  }

 

  fetchEtatDeCaisse(): void {
    this.clientDataService.GetEtatDeCaisseCda().subscribe(
      (response) => {
        this.etatDeCaisseList = response;
        console.log(this.etatDeCaisseList); // Optional: For debugging to verify data
      },
      (error) => {
        console.error('Error fetching Etat De Caisse:', error);
      }
    );
  }

  fetchSolde(): void 
  {
    this.clientDataService.getSoldeAgence().subscribe(
      (response) => {
        this.solde = response;
        console.log(this.solde); 
      },
      (error) => {
        console.error('Error fetching Etat De Caisse:', error);
      }
    );

  }
}
