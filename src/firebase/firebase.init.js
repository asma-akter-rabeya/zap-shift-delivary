import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBIuwkPb8ZLyZK9Ae242bA5RVNzae4aQ94",
  authDomain: "zap-shift-6bbec.firebaseapp.com",
  projectId: "zap-shift-6bbec",
  storageBucket: "zap-shift-6bbec.firebasestorage.app",
  messagingSenderId: "562989417540",
  appId: "1:562989417540:web:86153fb5b086c414c86811",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);