// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCopcuksjsPAXvisiK4mOvYv81TnubYGUA",
    authDomain: "goread-68d49.firebaseapp.com",
    projectId: "goread-68d49",
    storageBucket: "goread-68d49.appspot.com",
    messagingSenderId: "715706426734",
    appId: "1:715706426734:web:7dd48cc72ab77decdfcd7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
