import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  updateUserForm!: FormGroup;  // Using the non-null assertion
  roles: string[] = ['Admin', 'User', 'Moderator'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.updateUserForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });

    // Load user data (replace this with actual user data loading logic)
    this.loadUserData();
  }

  loadUserData(): void {
    const user: User = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      role: 'User'
    };
    this.updateUserForm.patchValue(user);
  }

  onSubmit(): void {
    if (this.updateUserForm?.valid) {
      console.log('Updated user data:', this.updateUserForm.value);
      // Implement the save logic here (e.g., call a service to update the user)
    }
  }

  onCancel(): void {
    this.updateUserForm?.reset();
  }
}
