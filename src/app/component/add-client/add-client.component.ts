import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ClientService } from 'src/app/service/clientService/client.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  addClientForm!: FormGroup;
  agences: any[] = [];
  isAdmin: boolean = false;
  agenceInscription: any;

  constructor(
    private fb: FormBuilder,
    private clientDataService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.agenceInscription = localStorage.getItem('agence');
    const role = localStorage.getItem('role');
    this.isAdmin = role === 'ADMIN';

    if (this.isAdmin) {
      this.loadAgences();
    }

    this.addClientForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      cin: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]+$')]],
      dateNaissance: ['', Validators.required],
      lieuNaissance: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', Validators.email],
      typeClient: ['NORMAL', Validators.required],
      dateInscription: [{ value: new Date().toISOString().substring(0, 10), disabled: !this.isAdmin }, Validators.required],
      prixTotal: [, Validators.required],
      agenceId: [{ value: this.agenceInscription, disabled: !this.isAdmin }, Validators.required],
      montant: [, Validators.required]
    });
  }

  loadAgences(): void {
    this.clientDataService.getAgences().subscribe(
      (agences) => {
        this.agences = agences;
      },
      (error) => {
        console.error('Error loading agences:', error);
      }
    );
  }

  getControl(controlName: string): AbstractControl {
    return this.addClientForm.get(controlName)!;
  }

  onSubmit(): void {
    if (this.addClientForm.valid) {
      const formValue = {...this.addClientForm.getRawValue()};  // Use getRawValue to include disabled controls
      if (!this.isAdmin) {
        formValue.agenceId = this.agenceInscription;
      }
      this.clientDataService.createClient(formValue).subscribe(
        (response) => {
          console.log('Client added successfully:', response);
          this.router.navigate(['/clients']);
        },
        (error) => {
          console.error('Error adding client:', error);
        }
      );
    }
  }
}