import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientProbableService } from 'src/app/service/clientProbableService/client-probable.service';
import { ClientProbable } from 'src/app/model/clientProbable';

@Component({
  selector: 'app-client-probable-form',
  templateUrl: './client-probable-form.component.html',
  styleUrls: ['./client-probable-form.component.css']
})
export class ClientProbableFormComponent implements OnInit {
  clientProbableForm: FormGroup;
  isEditMode = false; 
  clientId?: number; 

  constructor(
    private fb: FormBuilder,
    private clientProbableService: ClientProbableService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.clientProbableForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      categorieDemandee: ['', Validators.required],
      dateVisite: ['', Validators.required],
      heureVisite: ['', Validators.required],
      commentaire: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.clientId = +id; 
        this.loadClientData(this.clientId);
      }
    });
  }

  loadClientData(id: number) {
    this.clientProbableService.getClientProbableById(id).subscribe(client => {
            client.dateVisite = new Date(client.dateVisite);
      this.clientProbableForm.patchValue(client);
    });
  }

  onSubmit(): void {
    const formValue = this.clientProbableForm.value;
  
    const clientProbable: ClientProbable = {
      ...formValue,
      dateVisite: formValue.dateVisite.toISOString().split('T')[0],       heureVisite: formValue.heureVisite,     };
  
    if (this.isEditMode && this.clientId) {
            this.clientProbableService.updateClientProbable(this.clientId, clientProbable).subscribe(
        () => {
          this.router.navigate(['/clientProbable/list']);         },
        error => {
          console.error('Error updating client probable', error);
        }
      );
    } else {
            this.clientProbableService.createClientProbable(clientProbable).subscribe(
        () => {
          this.router.navigate(['/clientProbable/list']);         },
        error => {
          console.error('Error adding client probable', error);
        }
      );
    }
  }
  
}
