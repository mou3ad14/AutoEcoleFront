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
  agences$: Observable<any[]> | undefined;

  constructor(
    private fb: FormBuilder,
    private clientDataService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
        this.agences$ = this.clientDataService.getAgences();

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
      dateInscription: ['', Validators.required],
      prixTotal: [, Validators.required],
      agenceId: [localStorage.getItem('agence'), Validators.required],
      montant:[, Validators.required]
    });
  }

  getControl(controlName: string): AbstractControl {
    return this.addClientForm.get(controlName)!;
  }

  onSubmit(): void {
    if (this.addClientForm.valid) {
      this.clientDataService.createClient(this.addClientForm.value).subscribe(
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
