// src/firebase/config.ts

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDB0IWmT8r3_c9E_5PTu4QIs8uJbLOgOs8",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "capty-webpage.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "capty-webpage",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "capty-webpage.firebasestorage.app",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:738442968929:web:015166331b7b60d2200f20",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-1SQSELXFN4"
};

// Only initialize if not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Optional: Analytics (only in browser)
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Firebase services
const db = getFirestore(app);
const functions = getFunctions(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Debug logs
console.log('✅ Firebase initialized');
console.log('📦 Storage Bucket:', firebaseConfig.storageBucket);

export { app, db, functions, analytics, storage, auth };
