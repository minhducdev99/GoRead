import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//     apiKey: process.env.VUE_APP_API_KEY,
//     authDomain: process.env.VUE_APP_AUTH_DOMAIN,
//     projectId: process.env.VUE_APP_PROJECT_ID,
//     storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
//     appId: process.env.VUE_APP_FIREBASE_ID
// };

const firebaseConfig = {
    apiKey: 'AIzaSyCopcuksjsPAXvisiK4mOvYv81TnubYGUA',
    authDomain: 'goread-68d49.firebaseapp.com',
    projectId: 'goread-68d49',
    storageBucket: 'goread-68d49.appspot.com',
    messagingSenderId: '715706426734',
    appId: '1:715706426734:web:7dd48cc72ab77decdfcd7f'
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
