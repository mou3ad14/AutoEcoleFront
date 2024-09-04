// // // import { Component, OnInit } from '@angular/core';
// // // import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// // // import { ClientService } from '../../service/clientService/client.service';
// // // import { Router } from '@angular/router';

// // // @Component({
// // //   selector: 'app-add-client',
// // //   templateUrl: './add-client.component.html',
// // //   styleUrls: ['./add-client.component.css']
// // // })
// // // export class AddClientComponent implements OnInit {
// // //   addClientForm: FormGroup;

// // //   constructor(
// // //     private fb: FormBuilder,
// // //     private clientService: ClientService,
// // //     private router: Router
// // //   ) {
// // //     this.addClientForm = this.fb.group({
// // //       nom: ['', Validators.required],
// // //       prenom: ['', Validators.required],
// // //       cin: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]+$')]],
// // //       adresse: ['', Validators.required],
// // //       telephone: ['', Validators.required],
// // //       email: ['', [Validators.required, Validators.email]],
// // //       dateInscription: ['', Validators.required],
// // //       agenceInscription: ['', Validators.required]
// // //     });
// // //   }

// // //   ngOnInit(): void {}

// // //   onSubmit(): void {
// // //     if (this.addClientForm.valid) {
// // //       console.log('Token stored:', localStorage.getItem('access_token'));

// // //       this.clientService.createClient(this.addClientForm.value).subscribe({
       
// // //         next: () => {
// // //           this.router.navigate(['/clients']);  
// // //         },
// // //         error: (err) => {
// // //           console.error('Error creating client:', err);
// // //         }
// // //       });
// // //     }
// // //   }
// // // }


// // import { Component, OnInit } from '@angular/core';
// // import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// // import { ClientService } from '../../service/clientService/client.service';
// // import { ClientDataService } from '../../service/userDataService/client-data.service'; // Import ClientDataService
// // import { Router } from '@angular/router';

// // @Component({
// //   selector: 'app-add-client',
// //   templateUrl: './add-client.component.html',
// //   styleUrls: ['./add-client.component.css']
// // })
// // export class AddClientComponent implements OnInit {
// //   addClientForm: FormGroup;
// //   agences: any[] = [];  // Array to store agences

// //   constructor(
// //     private fb: FormBuilder,
// //     private clientService: ClientService,
// //     private clientDataServaice: ClientDataService, // Inject ClientDataService
// //     private router: Router
// //   ) {
// //     this.addClientForm = this.fb.group({
// //       nom: ['', Validators.required],
// //       prenom: ['', Validators.required],
// //       cin: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]+$')]],
// //       adresse: ['', Validators.required],
// //       telephone: ['', Validators.required],
// //       email: ['', [Validators.required, Validators.email]],
// //       dateInscription: ['', Validators.required],
// //       agenceInscription: ['', Validators.required]
// //     });
// //   }

// //   ngOnInit(): void {
// //     this.loadAgences();  // Load agences on component initialization
// //   }

// //   loadAgences(): void {
// //     this.clientDataServaice.getAgences().subscribe({
// //       next: (data) => {
// //         this.agences = data;
// //       },
// //       error: (err) => {
// //         console.error('Error fetching agences:', err);
// //       }
// //     });
// //   }

// //   onSubmit(): void {
// //     if (this.addClientForm.valid) {
// //       this.clientService.createClient(this.addClientForm.value).subscribe({
// //         next: () => {
// //           this.router.navigate(['/clients']);
// //         },
// //         error: (err) => {
// //           console.error('Error creating client:', err);
// //         }
// //       });
// //     }
// //   }
// // }


// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ClientService } from 'src/app/service/clientService/client.service';
// import { Router } from '@angular/router';
// import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-add-client',
//   templateUrl: './add-client.component.html',
//   styleUrls: ['./add-client.component.css']
// })
// export class AddClientComponent implements OnInit {
//   addClientForm!: FormGroup;
//   agences$: Observable<any[]> | undefined; // Adjust the type if you have an Agence model

//   constructor(
//     private fb: FormBuilder,
//     private clientDataService: ClientService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     // Fetch agences from the API
//     this.agences$ = this.clientDataService.getAgences();

//     // Initialize the form
//     this.addClientForm = this.fb.group({
//       nom: ['', Validators.required],
//       prenom: ['', Validators.required],
//       cin: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]+$')]],
//       adresse: ['', Validators.required],
//       telephone: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       dateInscription: ['', Validators.required],
//       agence: ['', Validators.required], // Add Agence control
//       // Add any additional fields you need from the Client entity
//       montant: [''],
//       typeClient: [''],
//       seancesPratiques: [''],
//       seancesTheoriques: [''],
//       dateNaissance: [''],
//       lieuNaissance: [''],
//       prixTotal: [''],
//     });
//   }

//   onSubmit(): void {
//     if (this.addClientForm.valid) {
//       this.clientDataService.createClient(this.addClientForm.value).subscribe(
//         (response) => {
//           console.log('Client added successfully:', response);
//           this.router.navigate(['/clients']);  // Redirect to the clients page
//         },
//         (error) => {
//           console.error('Error adding client:', error);
//         }
//       );
//     }
//   }
// }

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
    // Fetch agences from the API
    this.agences$ = this.clientDataService.getAgences();

    // Initialize the form
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
      dateInscription: ['', Validators.required],
      prixTotal: [0, Validators.required],
      agenceId: ['', Validators.required]
    });
  }

  getControl(controlName: string): AbstractControl {
    return this.addClientForm.get(controlName)!; // Use non-null assertion operator
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
