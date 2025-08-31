import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../login/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user: User= new User({});

  successMessage: string = '';
  errorMessage: string = '';





  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    
    this.auth.registrer(this.user).subscribe(
      (response: any) => {
        this.successMessage = 'Registration successful! Redirecting to login...';
        setTimeout(() => {
          this.router.navigate(['/login']); // Redirect to login after 2 seconds
        }, 2000);
      },
      (error) => {
        console.log(error);
        console.log(error.error);
        console.log(error.error.message);
        this.errorMessage = error.error.message || `Echec lors de l'enregistrement`;
      }
    );

  }
}
