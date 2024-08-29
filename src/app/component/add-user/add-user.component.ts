// // import { Component, OnInit } from '@angular/core';
// // import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// // import { ClientDataService } from 'src/app/service/userDataService/client-data.service';
// // @Component({
// //   selector: 'app-add-user',
// //   templateUrl: './add-user.component.html',
// //   styleUrls: ['./add-user.component.css']
// // })
// // export class AddUserComponent implements OnInit {
// //   addUserForm!: FormGroup;
// //   roles: string[] = [];

// //   userRoles: any;

// //   constructor(private fb: FormBuilder,private data :ClientDataService  ) {}

// //   ngOnInit() {
// //     this.addUserForm = this.fb.group({
// //       firstname: ['', Validators.required],
// //       lastname: ['', Validators.required],
// //       email: ['', [Validators.required, Validators.email]],
// //       password: ['', Validators.required],
// //     });
// //     this.data.getUserRoles().subscribe(
// //       (roles) => {
// //         this.userRoles = roles;
// //         console.log('User Roles:', this.userRoles);
// //       },
// //       (error) => {
// //         console.error('Error fetching roles:', error);
// //       }
// //     );
// //   }
// //   onSubmit(): void {
// //     if (this.addUserForm.valid) {
// //       console.log('User Data:', this.addUserForm.value);
// //     }
// //   }
// // }

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ClientDataService } from 'src/app/service/userDataService/client-data.service';
// import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-add-user',
//   templateUrl: './add-user.component.html',
//   styleUrls: ['./add-user.component.css']
// })
// export class AddUserComponent implements OnInit {
//   addUserForm!: FormGroup;
//   roles$: Observable<string[]> | undefined;

//   constructor(private fb: FormBuilder, private authService: ClientDataService) {}

//   ngOnInit(): void {
//     // Fetch roles from the API
//     this.roles$ = this.authService.getUserRoles();

//     // Initialize the form
//     this.addUserForm = this.fb.group({
//       firstname: ['', Validators.required],
//       lastname: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required],
//       role: ['', Validators.required]
//     });
//   }

//   onSubmit(): void {
//     if (this.addUserForm.valid) {
//       console.log('Form Data:', this.addUserForm.value);
//       // Handle form submission here
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientDataService } from 'src/app/service/userDataService/client-data.service';
import { AuthService } from 'src/app/service/authService/auth-service.service';  // Adjust the path as necessary
import { Observable } from 'rxjs';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm!: FormGroup;
  roles$: Observable<string[]> | undefined;

  constructor(private fb: FormBuilder, private clientDataService: ClientDataService,private router: Router) {}

  ngOnInit(): void {
    // Fetch roles from the API
    this.roles$ = this.clientDataService.getUserRoles();

    // Initialize the form
    this.addUserForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.addUserForm.valid) {
      this.clientDataService.registerUser(this.addUserForm.value).subscribe(
        (response) => {
          console.log('User added successfully:', response);
          // Redirect to the view all users page
          this.router.navigate(['/users']);
        },
        (error) => {
          console.error('Error adding user:', error);
        }
      );
    }
  }
}
