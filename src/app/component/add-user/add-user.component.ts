import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientDataService } from 'src/app/service/userDataService/client-data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm!: FormGroup;
  roles$: Observable<string[]> | undefined;
  agences$: Observable<any[]> | undefined; 
  constructor(private fb: FormBuilder, private clientDataService: ClientDataService, private router: Router) {}

  ngOnInit(): void {
        this.roles$ = this.clientDataService.getUserRoles();
    this.agences$ = this.clientDataService.getAgences();

        this.addUserForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      agence: ['', Validators.required]      });
  }

  onSubmit(): void {
    if (this.addUserForm.valid) {
      this.clientDataService.registerUser(this.addUserForm.value).subscribe(
        (response) => {
          console.log('User added successfully:', response);
          this.router.navigate(['/users']);
        },
        (error) => {
          console.error('Error adding user:', error);
        }
      );
    }
  }
}
