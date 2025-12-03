// create and initialize your own firebase here
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1frJXCPz2nc5eiTOEZsQv3LZivBBo52A",
  authDomain: "photofolio-20e28.firebaseapp.com",
  projectId: "photofolio-20e28",
  storageBucket: "photofolio-20e28.firebasestorage.app",
  messagingSenderId: "475131149559",
  appId: "1:475131149559:web:5f5afac2bfbad15d0e27f2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);