import { Component } from '@angular/core';
import { AuthService } from '../../service/authService/auth-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.authService.storeToken(response.accessToken);
        this.router.navigate(['/clients']); 
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }
}

