// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMYje85m2sxmVjsQMK8SNOkDALpL3HNzA",
  authDomain: "react-fire-crud-81818.firebaseapp.com",
  projectId: "react-fire-crud-81818",
  storageBucket: "react-fire-crud-81818.firebasestorage.app",
  messagingSenderId: "223129812762",
  appId: "1:223129812762:web:aaa75a7752cfd29b9f76a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}