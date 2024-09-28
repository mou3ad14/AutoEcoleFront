import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ClientDataService } from 'src/app/service/userDataService/client-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  addClientForm!: FormGroup;
  userRole: string | null = localStorage.getItem('role'); 

  constructor(
    private fb: FormBuilder,
    private clientDataService: ClientDataService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.addClientForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      cin: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]+$')]],
      dateNaissance: ['', Validators.required],
      lieuNaissance: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      typeClient: ['NORMAL', Validators.required],
      dateInscription: [{ value: new Date().toISOString().substring(0, 10), disabled: this.userRole !== 'ADMIN' }, Validators.required],
      prixTotal: [null, Validators.required],
      agenceId: [localStorage.getItem('agence'), Validators.required],
      montant: [null, Validators.required]
    });
  }

  getControl(controlName: string): AbstractControl {
    return this.addClientForm.get(controlName)!;
  }

  onSubmit(): void {
    if (this.addClientForm.valid) {
      this.clientDataService.registerUser(this.addClientForm.value).subscribe(
        response => {
          console.log('Client added successfully:', response);
          this.router.navigate(['/clients']);
        },
        error => {
          console.error('Error adding client:', error);
        }
      );
    }
  }
}
