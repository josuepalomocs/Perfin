// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDia_EtG9ij5tEc2n7tS0vq-asulT_aveg",
  authDomain: "perfin-b4307.firebaseapp.com",
  projectId: "perfin-b4307",
  storageBucket: "perfin-b4307.appspot.com",
  messagingSenderId: "429020273800",
  appId: "1:429020273800:web:3a9793fefb01690b1a533d",
  measurementId: "G-VG12Y45FJV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
