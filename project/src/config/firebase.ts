// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrcsj-d1Q_dikAq7k9tBmakyEiDaSqHbA",
  authDomain: "koroglu-site.firebaseapp.com",
  projectId: "koroglu-site",
  storageBucket: "koroglu-site.firebasestorage.app",
  messagingSenderId: "783601508952",
  appId: "1:783601508952:web:3111c813f693409c7c602d",
  measurementId: "G-H16BRK0K5P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;