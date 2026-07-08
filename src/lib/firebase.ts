import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCJMgcTEg_pdGL2doCv4gJ4tEnonFTAAk",
  authDomain: "at-church-e3570.firebaseapp.com",
  projectId: "at-church-e3570",
  storageBucket: "at-church-e3570.firebasestorage.app",
  messagingSenderId: "96864561696",
  appId: "1:96864561696:web:6435cccec4764e10f7ea45",
  measurementId: "G-KXVWNE0JN8"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
