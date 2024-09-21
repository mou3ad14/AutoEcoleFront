// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { ClientService } from 'src/app/service/clientService/client.service';
// @Component({
//   selector: 'app-client-details-dialog',
//   templateUrl: './client-details-dialog.component.html',
//   styleUrls: ['./client-details-dialog.component.css']
// })
// export class ClientDetailsDialogComponent {
//   constructor(
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private clientService: ClientService
//   ) {}

//   addPaiement(): void {
//     const montant = 500; 
//     this.clientService.addPaiementToClient(this.data.id, montant)
//       .subscribe(
//         (response) => {
//           console.log('Paiement added:', response);
          
//         },
//         (error) => {
//           console.error('Error adding paiement:', error);
//         }
//       );
//   }

//   addSeanceTheorique(): void {
//     this.clientService.addSeanceTheoriqueToClient(this.data.cin)
//       .subscribe(
//         (response) => {
//           console.log('Séance théorique added:', response);
//         },
//         (error) => {
//           console.error('Error adding séance théorique:', error);
//         }
//       );
//   }
// }


import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from 'src/app/service/clientService/client.service';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component'; // Import the dialog component

@Component({
  selector: 'app-client-details-dialog',
  templateUrl: './client-details-dialog.component.html',
  styleUrls: ['./client-details-dialog.component.css']
})
export class ClientDetailsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientService: ClientService,
    private dialog: MatDialog // Inject the MatDialog service
  ) {}

  // Method to open the payment dialog
  addPaiement(): void {
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: '300px',
      data: { id: this.data.id } // Pass any relevant data here
    });

    dialogRef.afterClosed().subscribe((montant) => {
      if (montant) {
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
    });
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
