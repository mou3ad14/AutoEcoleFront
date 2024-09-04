import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../service/clientService/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../model/client';
@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateUserComponent implements OnInit {
  personalDetailsFormGroup!: FormGroup;
  contactDetailsFormGroup!: FormGroup;
  otherDetailsFormGroup!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.personalDetailsFormGroup = this._formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      cin: ['', Validators.required],
    });

    this.contactDetailsFormGroup = this._formBuilder.group({
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required],
    });

    this.otherDetailsFormGroup = this._formBuilder.group({
      dateNaissance: ['', Validators.required],
      lieuNaissance: ['', Validators.required],
      dateInscription: ['', Validators.required],
      agenceInscription: ['', Validators.required],
      prixTotal: ['', Validators.required],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.clientService.getClientById(id).subscribe(client => {
        this.populateForm(client);
      });
    }
  }

  populateForm(client: Client) {
    this.personalDetailsFormGroup.patchValue({
      nom: client.nom,
      prenom: client.prenom,
      cin: client.cin
    });

    this.contactDetailsFormGroup.patchValue({
      telephone: client.telephone,
      email: client.email,
      adresse: client.adresse
    });

    this.otherDetailsFormGroup.patchValue({
      dateNaissance: client.dateNaissance,
      lieuNaissance: client.lieuNaissance,
      dateInscription: client.dateInscription,
      agenceInscription: client.agence?.name,
      prixTotal: client.prixTotal
    });
  }

  updateClient() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const numericId = parseInt(id, 10);  // Convert the id to a number

      const updatedClient: Client = {
        ...this.personalDetailsFormGroup.value,
        ...this.contactDetailsFormGroup.value,
        ...this.otherDetailsFormGroup.value,
      };
    
      this.clientService.updateClient(numericId, updatedClient).subscribe(() => {
        this.router.navigate(['/clients']);
      });
    }
  }
}
