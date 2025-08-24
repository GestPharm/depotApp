import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  imports: [ReactiveFormsModule],
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordsMatch }
    );
  }

  passwordsMatch(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      const { currentPassword, newPassword } = this.passwordForm.value;
      const userId = this.authService.getUser().id; // Ajoutez une méthode pour récupérer l'ID utilisateur si nécessaire
      if(userId === undefined) {
        console.error('User ID is undefined');
        return;
      }
      this.authService.changePassword(userId, currentPassword, newPassword).subscribe({
        next: (response) => {
          console.log('Mot de passe changé avec succès', response);
        },
        error: (err) => {
          console.error('Erreur lors du changement de mot de passe', err);
        }
      });
    }
  }
}
