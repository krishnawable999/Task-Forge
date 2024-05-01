// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_APP_KEY,
  authDomain: "task-forge-220e8.firebaseapp.com",
  projectId: "task-forge-220e8",
  storageBucket: "task-forge-220e8.appspot.com",
  messagingSenderId: "967091912810",
  appId: "1:967091912810:web:37479885c66dc87f170a13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);