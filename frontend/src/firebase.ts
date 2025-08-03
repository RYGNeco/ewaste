// frontend/src/firebase.ts
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA75Olwdvx6F7pwJCuPVBLz7iJtTxWQbJQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "rygneco-f58e7.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "rygneco-f58e7",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "rygneco-f58e7.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "761945196987",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:761945196987:android:41ab8a0de7228b88f45c9e"
};

initializeApp(firebaseConfig); 