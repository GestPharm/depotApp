import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = {
    username: '',
    password: '',
  };

  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post('/api/login', this.credentials).subscribe(
      (response: any) => {
        // Handle successful login
        localStorage.setItem('token', response.token); // Save the token (if using JWT)
        this.router.navigate(['/dashboard']); // Redirect to the dashboard or home page
      },
      (error) => {
        // Handle login error
        this.errorMessage = 'Invalid username or password';
      }
    );
  }
}