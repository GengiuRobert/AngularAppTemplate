import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule,NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.services';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';
import { AppConfigService } from '../../services/appconfig.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule,NgIf],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  public email = '';
  public password = '';
  public confirmPassword = '';
  public message = '';
  public success = '';
  private currentErrorCode: string | null = null;
  private langSubscription: Subscription | null = null;

  constructor(private authService: AuthService, public translateService: TranslationService, private appService: AppConfigService) { }

  ngOnInit(): void {
    this.langSubscription = this.translateService.getCurrentLangObservable().subscribe(() => {
      this.updateMessageTranslation();
    });
  }

  ngOnDestroy(): void {
    this.langSubscription?.unsubscribe();
  }

  private updateMessageTranslation(): void {
    if (this.currentErrorCode) {
      this.message = this.authService.handleFirebaseError(this.currentErrorCode);
    }
  }


  onSignup(): void {

    this.message = '';  
    this.success = '';

    if (this.password !== this.confirmPassword) {
      this.currentErrorCode = 'missmatch';
      this.message = this.authService.handleFirebaseError(this.currentErrorCode); 
      return;
    }

    this.authService.signup(this.email, this.password)
      .then(() => {
        this.currentErrorCode = 'oksignup';
        this.success = this.authService.handleFirebaseError(this.currentErrorCode)
      })
      .catch(error => {
        this.currentErrorCode = error.message;
        this.message = this.authService.handleFirebaseError(this.currentErrorCode);
      });
  }

  setLanguage(languageCode: string): void {
    this.appService.changeLanguage(languageCode);
  }
}
