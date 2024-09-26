import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css']
})
export class PaymentDialogComponent {
  montant!: number; 
  constructor(
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

    onAdd(): void {
    if (this.montant > 0) {
      this.dialogRef.close(this.montant);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
