import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ClientDataService } from '../../service/userDataService/client-data.service'; // Your service
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { EtatDeCaisse } from 'src/app/model/EtatDeCaisse';

@Component({
  selector: 'app-etat-financiere',
  templateUrl: './etat-financiere.component.html',
  styleUrls: ['./etat-financiere.component.css']
})
export class EtatFinanciereComponent implements OnInit {
  agences: any[] = []; // List of agencies from backend
  displayedColumns: string[] = ['clientNom', 'clientPrenom', 'clientCin', 'heurePaiement', 'montant'];
  dataSource = new MatTableDataSource<any>([]);

  // Form controls
  agenceControl = new FormControl();
  dateControl = new FormControl();

  constructor(private clientDataService: ClientDataService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.loadAgences(); // Load agencies on init
  }

  // Load the list of agencies
  loadAgences(): void {
    this.clientDataService.getAgences().subscribe(
      (data) => {
        this.agences = data;
      },
      (error) => {
        console.error('Failed to load agencies', error);
      }
    );
  }

  // Fetch Etat de Caisse by agence and date
  searchEtatDeCaisse(): void {
    const agenceId = this.agenceControl.value;
    const date = this.datePipe.transform(this.dateControl.value, 'yyyy-MM-dd');
  
    if (agenceId && date) {
      this.clientDataService.getEtatDeCaisseByAgenceAndDate(agenceId, date).subscribe(
        (data: EtatDeCaisse | EtatDeCaisse[]) => {
          console.log('Backend response:', data);  // Debugging
  
          // Check if the response is an array or a single object
          let allPaiements = [];
          if (Array.isArray(data)) {
            allPaiements = data
              .map(state => state.paiements || [])
              .reduce((acc, paiements) => acc.concat(paiements), []);
          } else {
            allPaiements = data.paiements || [];
          }
  
          this.dataSource.data = allPaiements;  // Set paiements to the data source
        },
        (error) => {
          console.error('Failed to fetch etat de caisse', error);
        }
      );
    } else if (agenceId) {
      this.clientDataService.getEtatDeCaisseByAgence(agenceId).subscribe(
        (data: EtatDeCaisse | EtatDeCaisse[]) => {
          let allPaiements = [];
          if (Array.isArray(data)) {
            allPaiements = data
              .map(state => state.paiements || [])
              .reduce((acc, paiements) => acc.concat(paiements), []);
          } else {
            allPaiements = data.paiements || [];
          }
  
          this.dataSource.data = allPaiements;
        },
        (error) => {
          console.error('Failed to fetch etat de caisse by agence', error);
        }
      );
    } else {
      console.warn('Please select an agence or a date.');
    }
  }
  
  
  
}
