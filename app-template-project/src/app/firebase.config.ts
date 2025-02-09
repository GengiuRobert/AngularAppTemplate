// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBv9p-__ZIGfCoYs_UUql9t2NL516pi-4g",
  authDomain: "angular-app-template-66c6b.firebaseapp.com",
  projectId: "angular-app-template-66c6b",
  storageBucket: "angular-app-template-66c6b.firebasestorage.app",
  messagingSenderId: "772016665122",
  appId: "1:772016665122:web:7894cbab8601b5c7d8907b",
  measurementId: "G-L891WVR8SZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);