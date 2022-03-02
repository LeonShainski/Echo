// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDk89D-Mo556f6Obx7Pas0IP8ZSt_sEkns",
  authDomain: "echo-3269c.firebaseapp.com",
  databaseURL: "https://echo-3269c-default-rtdb.firebaseio.com",
  projectId: "echo-3269c",
  storageBucket: "echo-3269c.appspot.com",
  messagingSenderId: "194707425502",
  appId: "1:194707425502:web:da098a526e1f2f244f9a4f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
export {
  auth,
  database
}


