import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCvSNSGvBWlvUshtgOkTPYVmsWucZ7Op4M",
  authDomain: "nutrition-app-78fdb.firebaseapp.com",
  projectId: "nutrition-app-78fdb",
  storageBucket: "nutrition-app-78fdb.appspot.com",
  messagingSenderId: "280878953357",
  appId: "1:280878953357:web:8f1c0e09abcd35c49343c4",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
