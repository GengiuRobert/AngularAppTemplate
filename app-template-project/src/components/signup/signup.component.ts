import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.services';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';
import { AppConfigService } from '../../services/appconfig.service';

@Component({
  selector: 'app-signup',
  imports: [NgIf, CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public email = '';
  public password = '';
  public confirmPassword = '';
  public message = '';

  constructor(private authService: AuthService, public translateService: TranslationService, private appService: AppConfigService) { }

  onSignup(): void {

    if (this.password !== this.confirmPassword) {
      this.message = 'Passwords do not match.';
      return;
    }

    this.authService.signup(this.email, this.password)
      .then(() => {
        this.message = 'Signup successful!';
      })
      .catch(error => {
        this.message = `Error: ${error.message}`;
      });
  }

  setLanguage(languageCode: string): void {
    this.appService.changeLanguage(languageCode);
  }
}
