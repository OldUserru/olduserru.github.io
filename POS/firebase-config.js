import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, ref, set, get, update, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyClYIYhGrFRp3qJfSqHMaY-sGnHGVueRj0",
  authDomain: "qiwi-tech-pos.firebaseapp.com",
  projectId: "qiwi-tech-pos",
  storageBucket: "qiwi-tech-pos.firebasestorage.app",
  messagingSenderId: "176747678691",
  appId: "1:176747678691:web:72c7fde48c1c4ade802ed6",
  measurementId: "G-LTRK1B473Q"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect, getRedirectResult, ref, set, get, update, onValue };
