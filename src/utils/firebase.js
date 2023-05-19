import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBj365PMWuykPnMKfzDqwO8u-7xMRGDCyM",
  authDomain: "planner-project-ce225.firebaseapp.com",
  databaseURL:
    "https://planner-project-ce225-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "planner-project-ce225",
  storageBucket: "planner-project-ce225.appspot.com",
  messagingSenderId: "394259991399",
  appId: "1:394259991399:web:95fbdb6f406f208436bdc2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const firebaseAuth = getAuth(app);
