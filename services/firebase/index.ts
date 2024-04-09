// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiS6UAxXHh0zeZiYtF7JLmYQCPP6Ll3Uo",
  authDomain: "auth-provider-prototype.firebaseapp.com",
  projectId: "auth-provider-prototype",
  storageBucket: "auth-provider-prototype.appspot.com",
  messagingSenderId: "492253500493",
  appId: "1:492253500493:web:29912c84a1b7a59dde7804",
  measurementId: "G-Q189ZWKHWD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;