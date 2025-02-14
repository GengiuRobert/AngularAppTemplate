import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.services'; 

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }

  savePreferences(preferences: any): Promise<void> {
    const user = this.authService.getCurrentUser(); 
    if (user) {
      return this.firestore.collection('userPreferences').doc(user.uid).set(preferences);
    } else {
      return Promise.reject('User not logged in');
    }
  }

  getPreferences(): Promise<any> {
    const user = this.authService.getCurrentUser();
    if (user) {
      return this.firestore.collection('userPreferences').doc(user.uid).get().toPromise();
    } else {
      return Promise.reject('User not logged in');
    }
  }
}
