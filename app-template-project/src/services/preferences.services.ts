import { Injectable, Injector } from '@angular/core';
import { firestore } from '../app/firebase.config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { AuthService } from './auth.services';

@Injectable({
  providedIn: 'root',
})
export class UserPreferencesService {
  private defaultPreferences = { language: 'en' };
  private authService: AuthService | null = null;

  constructor(private injector: Injector) { }

  private getAuthService(): AuthService {
    if (!this.authService) {
      this.authService = this.injector.get(AuthService);
    }
    return this.authService;
  }

  async savePreferences(preferences: any): Promise<void> {
    const user = this.getAuthService().getCurrentUser();
    if (user) {
      const userDoc = doc(firestore, 'userPreferences', user.uid);
      await setDoc(userDoc, preferences);
    } else {
      throw new Error('User not logged in');
    }
  }

  async getPreferences(): Promise<any> {
    const user = this.getAuthService().getCurrentUser();
    if (user) {
      const userDoc = doc(firestore, 'userPreferences', user.uid);
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return this.defaultPreferences; 
      }
    } else {
      throw new Error('User not logged in');
    }
  }
}
