import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBweWOkQ2A25e73f35VNxZjks43rQIzE_E",
  authDomain: "dashboard-aae06.firebaseapp.com",
  databaseURL: "https://dashboard-aae06-default-rtdb.firebaseio.com",
  projectId: "dashboard-aae06",
  storageBucket: "dashboard-aae06.firebasestorage.app",
  messagingSenderId: "558356976643",
  appId: "1:558356976643:web:306684e0ef11d161172a36",
  measurementId: "G-0JF6SFQVDK"
};

const app = initializeApp(firebaseConfig);
export const fireStore = getFirestore(app)
export const auth = getAuth(app)

