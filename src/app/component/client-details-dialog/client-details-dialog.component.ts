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
  newExamenTheoriqueDate: Date | undefined;
  newExamenPratiqueDate: Date | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ClientDetailsDialogComponent>,     private clientService: ClientService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private router: Router   ) {}

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
          this.dialogRef.close(); 
          this.router.navigate(['/client-list']);
        },
        (error) => {
          console.error('Error adding séance théorique:', error);
        }
      );
  }
  canAddTheoriqueExam(): boolean {
    return this.data.dateExamenTheorique.length < 2 && 
           (this.data.dateExamenTheorique.length === 0 || this.data.dateExamenPratique.length === 0);
  }

  canAddPratiqueExam(): boolean {
    return this.data.dateExamenPratique.length < 2 && 
           this.data.dateExamenTheorique.length > 0 &&
           (this.data.dateExamenPratique.length === 0 || this.data.dateExamenTheorique.length === 1);
  }

  addExamenTheorique(): void {
    if (!this.newExamenTheoriqueDate) {
      console.error('Error: Missing theoretical exam date');
      alert('Veuillez sélectionner une date pour l\'examen théorique.');
      return;
    }

    const formattedDate = this.datePipe.transform(this.newExamenTheoriqueDate, 'yyyy-MM-dd');

    if (formattedDate) {
      this.clientService.addExamenTheoriqueToClient(this.data.cin, formattedDate)
        .subscribe(
          (response) => {
            console.log('Examen théorique added:', response);
            this.updateClientData(response);
          },
          (error) => {
            console.error('Error adding examen théorique:', error);
            alert('Erreur lors de l\'ajout de l\'examen théorique.');
          }
        );
    } else {
      console.error('Error: Invalid date format');
    }
  }

  addExamenPratique(): void {
    if (!this.newExamenPratiqueDate) {
      console.error('Error: Missing practical exam date');
      alert('Veuillez sélectionner une date pour l\'examen pratique.');
      return;
    }

    const theoriqueDate = new Date(this.data.dateExamenTheorique[this.data.dateExamenTheorique.length - 1]);
    const pratiqueDate = new Date(this.newExamenPratiqueDate);

    if (pratiqueDate <= theoriqueDate) {
      console.error('Error: Practical exam date must be at least one day after the theoretical exam date.');
      alert('La date d\'examen pratique doit être au moins un jour après l\'examen théorique.');
      return;
    }

    const formattedDate = this.datePipe.transform(this.newExamenPratiqueDate, 'yyyy-MM-dd');

    if (formattedDate) {
      this.clientService.addExamenPratiqueToClient(this.data.cin, formattedDate)
        .subscribe(
          (response) => {
            console.log('Examen pratique added:', response);
            this.updateClientData(response);
          },
          (error) => {
            console.error('Error adding examen pratique:', error);
            alert('Erreur lors de l\'ajout de l\'examen pratique.');
          }
        );
    } else {
      console.error('Error: Invalid date format');
    }
  }

  updateClientData(updatedClient: any): void {
    Object.assign(this.data, updatedClient);
    this.newExamenTheoriqueDate = undefined;
    this.newExamenPratiqueDate = undefined;
  }
}
