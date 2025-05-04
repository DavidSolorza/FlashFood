// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB1xFPIAq7VnOQcdKIzJxz86Gd82dwXtO0",
    authDomain: "flash-food-2789b.firebaseapp.com",
    projectId: "flash-food-2789b",
    storageBucket: "flash-food-2789b.firebasestorage.app",
    messagingSenderId: "448178826462",
    appId: "1:448178826462:web:ef3026e6a5259368c2e64f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
