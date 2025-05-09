import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = {
    username: '',
    password: '',
  };

  errorMessage: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.login(this.credentials.username, this.credentials.password).subscribe({
      next: (res) => {
        this.auth.storeToken(res.token); // assuming { token: '...' }
        this.router.navigate(['/home']);
      },
      error: () => {
        this.errorMessage = 'Invalid credentials';
      }
    });
  }


}