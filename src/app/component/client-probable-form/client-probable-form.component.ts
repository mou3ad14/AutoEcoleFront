// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ClientProbableService } from 'src/app/service/clientProbableService/client-probable.service';
// import { ClientProbable } from 'src/app/model/clientProbable';

// @Component({
//   selector: 'app-client-probable-form',
//   templateUrl: './client-probable-form.component.html',
//   styleUrls: ['./client-probable-form.component.css']
// })
// export class ClientProbableFormComponent implements OnInit {
//   clientProbableForm: FormGroup;
//   isEditMode: boolean = false;
//   clientId: number | null = null;  // ID for updating client

//   constructor(
//     private fb: FormBuilder,
//     private clientProbableService: ClientProbableService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {
//     this.clientProbableForm = this.fb.group({
//       fullName: ['', Validators.required],
//       phoneNumber: ['', Validators.required],
//       categorieDemandee: ['', Validators.required],
//       dateVisite: ['', Validators.required],
//       heureVisite: ['', Validators.required],
//       commentaire: ['']
//     });
//   }

//   ngOnInit(): void {
//     // Check if we are in edit mode
//     this.route.paramMap.subscribe(params => {
//       const id = params.get('id');
//       if (id) {
//         this.isEditMode = true;
//         this.clientId = +id; // Convert the id to number
//         this.loadClientProbable(this.clientId);
//       }
//     });
//   }

//   // Load client probable details when in edit mode
//   loadClientProbable(id: number) {
//     this.clientProbableService.getClientProbableById(id).subscribe(client => {
//       this.clientProbableForm.patchValue(client);  // Fill the form with the client's data
//     });
//   }

//   onSubmit(): void {
//     if (this.clientProbableForm.valid) {
//       const clientData = this.clientProbableForm.value;
      
//       if (this.isEditMode && this.clientId) {
//         // Update existing client
//         this.clientProbableService.updateClientProbable(this.clientId, clientData).subscribe(() => {
//           this.router.navigate(['/client-probable-list']);  // Navigate to list after update
//         });
//       } else {
//         // Create new client
//         this.clientProbableService.createClientProbable(clientData).subscribe(() => {
//           this.router.navigate(['/client-probable-list']);  // Navigate to list after creation
//         });
//       }
//     }
//   }
// }
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
      // Ensure dateVisite is a Date object
      client.dateVisite = new Date(client.dateVisite);
      this.clientProbableForm.patchValue(client);
    });
  }

  onSubmit(): void {
    const formValue = this.clientProbableForm.value;
  
    const clientProbable: ClientProbable = {
      ...formValue,
      dateVisite: formValue.dateVisite.toISOString().split('T')[0], // Format to YYYY-MM-DD
      heureVisite: formValue.heureVisite, // Keep it as HH:mm
    };
  
    if (this.isEditMode && this.clientId) {
      // Update existing client
      this.clientProbableService.updateClientProbable(this.clientId, clientProbable).subscribe(
        () => {
          this.router.navigate(['/clientProbable/list']); // Redirect to the list after update
        },
        error => {
          console.error('Error updating client probable', error);
        }
      );
    } else {
      // Create new client
      this.clientProbableService.createClientProbable(clientProbable).subscribe(
        () => {
          this.router.navigate(['/clientProbable/list']); // Redirect to the list after successful addition
        },
        error => {
          console.error('Error adding client probable', error);
        }
      );
    }
  }
  
}
