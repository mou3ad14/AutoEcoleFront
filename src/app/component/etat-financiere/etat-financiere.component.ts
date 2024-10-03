import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ClientDataService } from '../../service/userDataService/client-data.service'; import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { EtatDeCaisse } from 'src/app/model/EtatDeCaisse';

@Component({
  selector: 'app-etat-financiere',
  templateUrl: './etat-financiere.component.html',
  styleUrls: ['./etat-financiere.component.css']
})
export class EtatFinanciereComponent implements OnInit {
  agences: any[] = [];   displayedColumns: string[] = ['clientNom', 'clientPrenom', 'clientCin', 'heurePaiement', 'montant'];
  dataSource = new MatTableDataSource<any>([]);
  solde: any = 0;
  etatDeCaisseId: number | null = null;
  etatDeCaisseStatus: string = "";  
    agenceControl = new FormControl();
  dateControl = new FormControl();

  constructor(private clientDataService: ClientDataService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.loadAgences();   }

    loadAgences(): void {
    this.clientDataService.getAgences().subscribe(
      data => this.agences = data,
      error => console.error('Failed to load agencies', error)
    );
  }

    searchEtatDeCaisse(): void {
    const agenceId = this.agenceControl.value;
    const date = this.datePipe.transform(this.dateControl.value, 'yyyy-MM-dd');

    if (agenceId && date) {
      this.fetchEtatDeCaisseByDate(agenceId, date);
      this.fetchSolde(agenceId);
    } else if (agenceId) {
      this.fetchEtatDeCaisseByAgence(agenceId);
    } else {
      console.warn('Please select an agence or a date.');
    }
  }

  private fetchEtatDeCaisseByDate(agenceId: number, date: string): void {
    this.clientDataService.getEtatDeCaisseByAgenceAndDate(agenceId, date).subscribe(
      data => this.processEtatDeCaisseResponse(data),
      error => {
        console.error('Failed to fetch etat de caisse', error);
        this.etatDeCaisseId = null;
      }
    );
  }

  private fetchEtatDeCaisseByAgence(agenceId: number): void {
    this.clientDataService.getEtatDeCaisseByAgence(agenceId).subscribe(
      data => this.processEtatDeCaisseResponse(data),
      error => console.error('Failed to fetch etat de caisse by agence', error)
    );
  }

  private processEtatDeCaisseResponse(data: EtatDeCaisse | EtatDeCaisse[]): void {
    console.log('Backend response:', data);      let allPaiements: any[] = [];

    if (Array.isArray(data)) {
      allPaiements = this.extractPaiementsFromArray(data);
      this.etatDeCaisseId = data.length > 0 ? data[0].id : null;  
      this.etatDeCaisseStatus = data.length > 0 ? data[0].status : "";      } else {
      allPaiements = data.paiements || [];
      this.etatDeCaisseId = data.id;        this.etatDeCaisseStatus = data.status;
    }

    this.dataSource.data = allPaiements;    }

  private extractPaiementsFromArray(data: EtatDeCaisse[]): any[] {
    return data
      .map(state => state.paiements || [])
      .reduce((acc, paiements) => acc.concat(paiements), []);
  }

    private fetchSolde(agenceId: number): void {
    this.clientDataService.getEtatDeCaisseByAgence(agenceId).subscribe(
      (soldeData: any[]) => {
        this.solde = soldeData;
        console.log('Agence Solde:', this.solde);        },
      error => {
        this.solde = 0;
        console.error('Failed to fetch solde for agence', error);
      }
    );
  }

  validerEtatDeCaisse(): void {
    if (this.etatDeCaisseId) {
      this.clientDataService.valider(this.etatDeCaisseId).subscribe(
        response => {
          console.log('Validation successful', response);
          window.location.reload();
        },
        error => {
          console.error('Failed to validate Etat de Caisse', error);
        }
      );
    }
  }
  
}
