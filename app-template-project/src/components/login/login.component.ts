import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule,NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { TranslationService } from '../../services/translation.service';
import { AuthService } from '../../services/auth.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  public email = '';
  public password = '';
  public message = '';
  public success = '';
  private currentErrorCode: string | null = null;
  private langSubscription: Subscription | null = null;


  constructor(public translateService: TranslationService, private authService: AuthService) { }

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

  onLogin(): void {
    this.message = '';  
    this.success = '';

    this.authService.login(this.email, this.password)
      .then(() => {
        this.currentErrorCode = 'oklogin';
        this.success = this.authService.handleFirebaseError(this.currentErrorCode);
      })
      .catch(error => {
        this.currentErrorCode = error.message;
        this.message = this.authService.handleFirebaseError(this.currentErrorCode);
      });
  }

  onResetPassword(): void {
    if (!this.email) {
      this.currentErrorCode = 'emailforreset';
      this.message = this.authService.handleFirebaseError(this.currentErrorCode);
      return;
    }

    this.authService.resetPassword(this.email)
      .then(() => {
        this.currentErrorCode = 'okreset';
        this.success = this.authService.handleFirebaseError(this.currentErrorCode);
      })
      .catch(error => {
        this.currentErrorCode = error.message;
        this.message = this.authService.handleFirebaseError(this.currentErrorCode);
      });
  }

} 
