// Import the required modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Replace with your actual Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase with your configuration
const app = initializeApp(firebaseConfig);

// Get the Firebase Auth instance
const auth = getAuth(app);
