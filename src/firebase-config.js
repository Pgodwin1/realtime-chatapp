// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7_McwLkN7UydD2huVRNAYSVjZJnAr1eE",
  authDomain: "chatapp-75401.firebaseapp.com",
  projectId: "chatapp-75401",
  storageBucket: "chatapp-75401.appspot.com",
  messagingSenderId: "127678910075",
  appId: "1:127678910075:web:cc6800b4733d093fb39cde",
  measurementId: "G-9WWV87YL40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);