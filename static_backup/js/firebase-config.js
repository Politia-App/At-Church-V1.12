// js/firebase-config.js

// Initialize Firebase using compat libraries to keep the existing global scope intact
const firebaseConfig = {
  projectId: "at-church-e3570",
  appId: "1:96864561696:web:6435cccec4764e10f7ea45",
  storageBucket: "at-church-e3570.firebasestorage.app",
  apiKey: "AIzaSyBCJMgcTEg_pdGL2doCv4gJ4tEnonFTAAk",
  authDomain: "at-church-e3570.firebaseapp.com",
  messagingSenderId: "96864561696",
  measurementId: "G-KXVWNE0JN8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Expose Auth and Firestore globally
window.firebaseAuth = firebase.auth();
window.firebaseDb = firebase.firestore();
