import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.services';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-signup',
  imports: [NgIf, CommonModule,FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email = '';
  password = '';
  message = '';

  constructor(private authService: AuthService,public translateService: TranslationService) {}

  onSignup(): void {
    this.authService.signup(this.email, this.password)
      .then(() => {
        this.message = 'Signup successful!';
      })
      .catch(error => {
        this.message = `Error: ${error.message}`;
      });
  }
}
