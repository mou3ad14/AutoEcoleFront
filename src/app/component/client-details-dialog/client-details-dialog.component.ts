
// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatDialog } from '@angular/material/dialog';
// import { ClientService } from 'src/app/service/clientService/client.service';
// import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component'; import { DatePipe } from '@angular/common';

// @Component({
//   selector: 'app-client-details-dialog',
//   templateUrl: './client-details-dialog.component.html',
//   styleUrls: ['./client-details-dialog.component.css']
// })
// export class ClientDetailsDialogComponent {

//   dateExamenTheorique: Date | undefined; 
//   dateExamenPratique: Date | undefined;  

//   constructor(
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private clientService: ClientService,
//     private dialog: MatDialog ,
//     private datePipe: DatePipe
//   ) {}

//     addPaiement(): void {
//     const dialogRef = this.dialog.open(PaymentDialogComponent, {
//       width: '300px',
//       data: { id: this.data.id }     });

    

//     dialogRef.afterClosed().subscribe((montant) => {
//       if (montant) {
//         this.clientService.addPaiementToClient(this.data.id, montant)
//           .subscribe(
//             (response) => {
//               console.log('Paiement added:', response);
//             },
//             (error) => {
//               console.error('Error adding paiement:', error);
//             }
//           );
//       }
//     });
//   }

 
  

//     addSeanceTheorique(): void {
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

//   addExamenTheorique(): void {
//     if (this.dateExamenTheorique) {
//       const formattedDate =  this.datePipe.transform(this.dateExamenTheorique, 'yyyy-MM-dd');
//       if (formattedDate) {

//       this.clientService.addExamenTheoriqueToClient(this.data.cin, formattedDate)
//       .subscribe(
//         (response) => {
//           console.log('Examen pratique added:', response);
//         },
//         (error) => {
//           console.error('Error adding examen pratique:', error);
//         }
//       );
//   } else {
//     console.error('Error: Invalid date format');
        
//     }}

//   }

//   addExamenPratique(): void {
//     if (!this.dateExamenPratique) {
//       console.error('Error: Missing practical exam date');
//       alert('Veuillez sélectionner une date pour l\'examen pratique.');
//       return;
//     }
 
//     if (!this.data?.dateExamenTheorique) {
//       console.error('Error: Missing theoretical exam date in the object.');
//       alert('La date de l\'examen théorique est manquante dans les détails du client.');
//       return;
//     }
  
//     const theoriqueDate = new Date(this.data.dateExamenTheorique); 
//     const pratiqueDate = new Date(this.dateExamenPratique);
  
//     if (pratiqueDate <= theoriqueDate) {
//       console.error('Error: Practical exam date must be at least one day after the theoretical exam date.');
//       alert('La date d\'examen pratique doit être au moins un jour après l\'examen théorique.');
//       return;
//     }
  
//     const formattedDate = this.datePipe.transform(this.dateExamenPratique, 'yyyy-MM-dd');
  
//     if (formattedDate) {
//       this.clientService.addExamenPratiqueToClient(this.data.cin, formattedDate)
//         .subscribe(
//           (response) => {
//             console.log('Examen pratique added:', response);
            
//           },
//           (error) => {
//             console.error('Error adding examen pratique:', error);
//           }
//         );
//     } else {
//       console.error('Error: Invalid date format');
//     }
//   }
  
  
// }

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from 'src/app/service/clientService/client.service';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-details-dialog',
  templateUrl: './client-details-dialog.component.html',
  styleUrls: ['./client-details-dialog.component.css']
})
export class ClientDetailsDialogComponent {

  dateExamenTheorique: Date | undefined; 
  dateExamenPratique: Date | undefined;  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ClientDetailsDialogComponent>, // Injecting MatDialogRef
    private clientService: ClientService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private router: Router // Injecting Router for navigation
  ) {}

  addPaiement(): void {
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: '300px',
      data: { id: this.data.id }
    });

    dialogRef.afterClosed().subscribe((montant) => {
      if (montant) {
        this.clientService.addPaiementToClient(this.data.id, montant)
          .subscribe(
            (response) => {
              console.log('Paiement added:', response);
              
              // Close dialog after payment is added
              this.dialogRef.close(); 
              this.router.navigate(['/client-list']);
            },
            (error) => {
              console.error('Error adding paiement:', error);
            }
          );
      }
    });
  }

  addSeanceTheorique(): void {
    this.clientService.addSeanceTheoriqueToClient(this.data.cin)
      .subscribe(
        (response) => {
          console.log('Séance théorique added:', response);
          
          // Close dialog after adding the theoretical session
          this.dialogRef.close(); 
          this.router.navigate(['/client-list']);
        },
        (error) => {
          console.error('Error adding séance théorique:', error);
        }
      );
  }

  addExamenTheorique(): void {
    if (this.dateExamenTheorique) {
      const formattedDate = this.datePipe.transform(this.dateExamenTheorique, 'yyyy-MM-dd');
      if (formattedDate) {
        this.clientService.addExamenTheoriqueToClient(this.data.cin, formattedDate)
          .subscribe(
            (response) => {
              console.log('Examen théorique added:', response);
              
              // Close dialog after adding the theoretical exam
              this.dialogRef.close(); 
              this.router.navigate(['/client-list']);
            },
            (error) => {
              console.error('Error adding examen théorique:', error);
            }
          );
      } else {
        console.error('Error: Invalid date format');
      }
    }
  }

  addExamenPratique(): void {
    if (!this.dateExamenPratique) {
      console.error('Error: Missing practical exam date');
      alert('Veuillez sélectionner une date pour l\'examen pratique.');
      return;
    }

    if (!this.data?.dateExamenTheorique) {
      console.error('Error: Missing theoretical exam date in the object.');
      alert('La date de l\'examen théorique est manquante dans les détails du client.');
      return;
    }

    const theoriqueDate = new Date(this.data.dateExamenTheorique);
    const pratiqueDate = new Date(this.dateExamenPratique);

    if (pratiqueDate <= theoriqueDate) {
      console.error('Error: Practical exam date must be at least one day after the theoretical exam date.');
      alert('La date d\'examen pratique doit être au moins un jour après l\'examen théorique.');
      return;
    }

    const formattedDate = this.datePipe.transform(this.dateExamenPratique, 'yyyy-MM-dd');

    if (formattedDate) {
      this.clientService.addExamenPratiqueToClient(this.data.cin, formattedDate)
        .subscribe(
          (response) => {
            console.log('Examen pratique added:', response);
            
            // Close dialog after adding the practical exam
            this.dialogRef.close(); 
            this.router.navigate(['/client-list']);
          },
          (error) => {
            console.error('Error adding examen pratique:', error);
          }
        );
    } else {
      console.error('Error: Invalid date format');
    }
  }
}
