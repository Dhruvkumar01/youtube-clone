// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAe4askeWEfQB5X2jaH2EnxxZPec2kfWbs",
  authDomain: "video-54fa7.firebaseapp.com",
  projectId: "video-54fa7",
  storageBucket: "video-54fa7.appspot.com",
  messagingSenderId: "609533768238",
  appId: "1:609533768238:web:bdb20c76835838b915a5bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth= getAuth();
export const provider= new GoogleAuthProvider();

export default app;