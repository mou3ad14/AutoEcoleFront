import { Component, OnInit } from '@angular/core';
import { ClientDataService } from '../service/userDataService/client-data.service';
import { EtatDeCaisse } from '../model/EtatDeCaisse';

@Component({
  selector: 'app-etat-de-caisse-list',
  templateUrl: './etat-de-caisse-list.component.html',
  styleUrls: ['./etat-de-caisse-list.component.css']
})
export class EtatDeCaisseListComponent implements OnInit {
  etatDeCaisse: EtatDeCaisse | null = null;
  displayedColumns: string[] = ['date', 'montantTotal', 'status', 'paiements'];
  solde: number = 0;

  constructor(private clientDataService: ClientDataService) {}

  ngOnInit(): void {
    this.fetchEtatDeCaisse();
    this.fetchSolde();
  }

  fetchEtatDeCaisse(): void {
    this.clientDataService.GetEtatDeCaisseCda().subscribe(
      (response) => {
        this.etatDeCaisse = response;
        console.log(this.etatDeCaisse);
      },
      (error) => {
        console.error('Error fetching Etat De Caisse:', error);
      }
    );
  }

  fetchSolde(): void {
    this.clientDataService.getSoldeAgence().subscribe(
      (response) => {
        this.solde = response;
        console.log(this.solde);
      },
      (error) => {
        console.error('Error fetching Solde:', error);
      }
    );
  }
}