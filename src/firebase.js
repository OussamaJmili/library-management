// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQJgG-EkqmGQIKgdSPkS47W4fvneq_3Bw",
  authDomain: "library-management-4c8dd.firebaseapp.com",
  projectId: "library-management-4c8dd",
  storageBucket: "library-management-4c8dd.firebasestorage.app",
  messagingSenderId: "479085488379",
  appId: "1:479085488379:web:49e2b8e06ca5621c46285e",
  measurementId: "G-YDFC8THTYH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
