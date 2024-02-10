import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuUeQ2mMhQIg886elBNY1m-S7GWOZzz4o",
  authDomain: "chatapp-caf47.firebaseapp.com",
  projectId: "chatapp-caf47",
  storageBucket: "chatapp-caf47.appspot.com",
  messagingSenderId: "322601331836",
  appId: "1:322601331836:web:22e07d6900e04523bd6df9",
  measurementId: "G-B3XN1MSG0P"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
