import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { TranslationService } from '../../services/translation.service';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-login',
  imports: [NgIf, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public email = '';
  public password = '';
  public message = '';

  constructor(public translateService: TranslationService, private authService: AuthService) { }

  onLogin(): void {
    this.authService.login(this.email, this.password)
      .then(() => {
        this.message = 'Login successful!';
      })
      .catch(error => {
        this.message = `Error: ${error.message}`;
      });
  }

  onResetPassword(): void {
    if (!this.email) {
      this.message = 'Please enter your email address to reset your password.';
      return;
    }

    this.authService.resetPassword(this.email)
      .then(() => {
        this.message = 'Password reset email sent successfully!';
      })
      .catch(error => {
        this.message = `Error: ${error.message}`;
      });
  }

} 
