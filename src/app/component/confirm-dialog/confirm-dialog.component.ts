import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h1 mat-dialog-title>Confirmation</h1>
    <div mat-dialog-content>
      <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
      <p>Nom: {{ data.firstname }} {{ data.lastname }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Non</button>
      <button mat-button (click)="onYesClick()">Oui</button>
    </div>
  `
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { firstname: string; lastname: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close('yes');
  }
}
