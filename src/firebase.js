// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdzUM7B8zZvDZw_yC0pTjhUBY3iQqRuuI",
  authDomain: "cashbook-1244.firebaseapp.com",
  projectId: "cashbook-1244",
  storageBucket: "cashbook-1244.appspot.com",
  messagingSenderId: "741117310495",
  appId: "1:741117310495:web:4b147efcf2f492cc80c72a",
  measurementId: "G-8XD7SMPEFL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);