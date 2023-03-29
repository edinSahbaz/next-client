// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1qcZtjmk5tieqb1Sl2gdw89jmavGZcHI",
  authDomain: "nauciprogramiranje-ba43d.firebaseapp.com",
  projectId: "nauciprogramiranje-ba43d",
  storageBucket: "nauciprogramiranje-ba43d.appspot.com",
  messagingSenderId: "1033414652138",
  appId: "1:1033414652138:web:86041086fc84c6f8192793",
  measurementId: "G-5FHNZBM2TG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);