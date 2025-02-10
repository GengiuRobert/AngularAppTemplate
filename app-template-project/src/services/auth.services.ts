import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { firebaseConfig } from '../app/firebase.config';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
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
}
