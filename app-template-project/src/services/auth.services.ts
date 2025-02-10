import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { firebaseConfig } from '../app/firebase.config';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private translateService: TranslationService) { }

  private auth = getAuth(initializeApp(firebaseConfig));

  signup(email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  resetPassword(email: string): Promise<any> {
    return sendPasswordResetEmail(this.auth, email);
  }

  handleFirebaseError(errorCode: string | null): string {

    let translatedMessage = '';

    switch (errorCode) {
      case 'Firebase: Error (auth/invalid-email).':
        translatedMessage = this.translateService.translate('InvalidEmail');
        break;
      case 'Firebase: Error (auth/user-disabled).':
        translatedMessage = this.translateService.translate('UserDisabled');
        break;
      case 'Firebase: Error (auth/user-not-found).':
        translatedMessage = this.translateService.translate('UserNotFound');
        break;
      case 'Firebase: Error (auth/invalid-credential).':
        translatedMessage = this.translateService.translate('WrongPassword');
        break;
      case 'Firebase: Error (auth/too-many-requests).':
        translatedMessage = this.translateService.translate('TooManyRequests');
        break;
      case 'Firebase: Error (auth/missing-password).':
        translatedMessage = this.translateService.translate('MissingPassword');
        break;
      case 'missmatch':
        translatedMessage = this.translateService.translate('PasswordMismatch');
        break;
      case 'emailforreset':
        translatedMessage = this.translateService.translate('EnterEmailForReset');
        break;
      case 'oksignup':
        translatedMessage = this.translateService.translate('SignupSuccessful');
        break;
      case 'oklogin':
        translatedMessage = this.translateService.translate('LoginSuccess');
        break;
      case 'okreset':
        translatedMessage = this.translateService.translate('ResetPasswordSuccess');
        break;
      default:
        translatedMessage = this.translateService.translate('UnknownError');
    }

    return translatedMessage;
  }
}
