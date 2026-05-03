import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAbxLh13l8Rb5eib3kTxDLlf_Q-3F8pGYQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "automate-faceless-content.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "automate-faceless-content",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "automate-faceless-content.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "726758105390",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:726758105390:web:af2bf1ed9ae0320d995abf",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-WWCPMT1THD"
};

// Initialize Firebase
let app;
let auth;

try {
  if (typeof window !== 'undefined' && firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  }
} catch (error) {
  console.error("Firebase initialization error", error);
}

export { app, auth };
