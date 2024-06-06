
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyA8RRcciKVvpqPceB4yYIcNa8XaA2ARhgk",
  authDomain: "social-73c90.firebaseapp.com",
  projectId: "social-73c90",
  storageBucket: "social-73c90.appspot.com",
  messagingSenderId: "588641311828",
  appId: "1:588641311828:web:97580b1b6d71cf10b9a1c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)