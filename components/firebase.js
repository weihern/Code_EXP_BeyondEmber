// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaYU0-fpKUv53vSS6MQ0dUkp5nbK-HF9Y",
  authDomain: "test-31e56.firebaseapp.com",
  projectId: "test-31e56",
  storageBucket: "test-31e56.appspot.com",
  messagingSenderId: "256912853244",
  appId: "1:256912853244:web:bd078180f47a156171af79",
  measurementId: "G-827GLJ418N"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
const analytics = getAnalytics(app);