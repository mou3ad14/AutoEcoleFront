import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from 'src/app/service/clientService/client.service';
@Component({
  selector: 'app-client-details-dialog',
  templateUrl: './client-details-dialog.component.html',
  styleUrls: ['./client-details-dialog.component.css']
})
export class ClientDetailsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientService: ClientService
  ) {}

  // Method to handle adding a payment
  addPaiement(): void {
    const montant = 500; // Replace with the actual montant value or retrieve from input form
    this.clientService.addPaiementToClient(this.data.id, montant)
      .subscribe(
        (response) => {
          console.log('Paiement added:', response);
          // Optionally refresh data or update UI
        },
        (error) => {
          console.error('Error adding paiement:', error);
        }
      );
  }

  // Method to handle adding a theoretical session
  addSeanceTheorique(): void {
    this.clientService.addSeanceTheoriqueToClient(this.data.cin)
      .subscribe(
        (response) => {
          console.log('Séance théorique added:', response);
        },
        (error) => {
          console.error('Error adding séance théorique:', error);
        }
      );
  }
}
