import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";


const firebaseConfig = {
    apiKey: "AIzaSyDyKkMWUEc44TJEbQECnq6R0pA7gfTPnCo",
    authDomain: "toywave-f76d0.firebaseapp.com",
    projectId: "toywave-f76d0",
    storageBucket: "toywave-f76d0.appspot.com",
    messagingSenderId: "209424368279",
    appId: "1:209424368279:web:c99c2ca80c81c177ccdfd2"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }