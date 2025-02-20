import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  User,
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
} from 'firebase/auth';
import { firebaseConfig } from '../app/firebase.config';
import { TranslationService } from './translation.service';
import { BehaviorSubject } from 'rxjs';
import { UserPreferencesService } from './preferences.services';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private auth = getAuth(initializeApp(firebaseConfig));
  private currentUser: User | null = null;
  private authStateSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  authState$ = this.authStateSubject.asObservable();


  constructor(private translateService: TranslationService, public userPreferencesService: UserPreferencesService) {
    this.monitorAuthState();
  }

  monitorAuthState(): void {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
      this.authStateSubject.next(this.isAuthenticated());
    });
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  signup(email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await sendEmailVerification(user);
        await signOut(this.auth);

        console.log('Verification email sent. User must verify email to continue.');
      })
      .catch((error) => {
        console.error('Error during signup:', error);
        throw error;
      });
  }

  login(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
  
        if (!user.emailVerified) {
          await signOut(this.auth);
          throw new Error('email-not-verified');
        }
  
        try {
          const preferences = await this.userPreferencesService.getPreferences();
          if (preferences.language) {
            this.translateService.setLanguage(preferences.language); 
            console.log('Preferences loaded and language set to:', preferences.language);
          }
        } catch (error) {
          console.error('Error loading preferences:', error);
          throw error;
        }
  
        return user;
      })
      .catch((error) => {
        console.error('Error during login:', error);
        throw error;
      });
  }

  logout(): Promise<void> {
    return signOut(this.auth)
      .then(() => {
        this.currentUser = null;
        console.log('User successfully logged out');
        this.authStateSubject.next(false);
      })
      .catch((error) => {
        console.error('Error during logout:', error);
        throw error;
      });
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
      case 'email-not-verified':
        translatedMessage = this.translateService.translate('EmailNotVerified');
        break;
      default:
        translatedMessage = this.translateService.translate('UnknownError');
    }

    return translatedMessage;
  }
}
