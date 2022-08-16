import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASECONFIG_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASECONFIG_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASECONFIG_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASECONFIG_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASECONFIG_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASECONFIG_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASECONFIG_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export default db;
