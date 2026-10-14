// ═══════════════════════════════════════════════════════════════
// js/firebase-config.js — Configuration Firebase Jason_INFORMATIQUE
// ═══════════════════════════════════════════════════════════════
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyCuUsi48moEEi6mm5-NLli_6E2IqW5WdRo",
  authDomain: "jason-informatique.firebaseapp.com",
  projectId: "jason-informatique",
  storageBucket: "jason-informatique.firebasestorage.app",
  messagingSenderId: "559284877514",
  appId: "1:559284877514:web:14a2be62d636c80b645c33",
  measurementId: "G-8GYJZNJLCV"
};

export const app = initializeApp(firebaseConfig);
export const db  = getFirestore(app);
export const auth = getAuth(app);

// Email de l'administrateur principal
export const ADMIN_EMAIL = 'jasoninformatique7@gmail.com';
