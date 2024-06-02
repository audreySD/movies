// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCAkmxxWl2tnxNiXGSHC94_vz4fLQxByTA",
  authDomain: "fir-2-f62be.firebaseapp.com",
  projectId: "fir-2-f62be",
  storageBucket: "fir-2-f62be.appspot.com",
  messagingSenderId: "459676269319",
  appId: "1:459676269319:web:22b84511fe893aa0dc23a2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
