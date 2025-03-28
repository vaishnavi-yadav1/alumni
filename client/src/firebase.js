// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "alumni-project-54f31.firebaseapp.com",
  projectId: "alumni-project-54f31",
  storageBucket: "alumni-project-54f31.firebasestorage.app",
  messagingSenderId: "645664244847",
  appId: "1:645664244847:web:9f816969ef8efedb4bb99a",
  measurementId: "G-5PFRVSHN9F"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

