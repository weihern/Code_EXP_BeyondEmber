// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaTEO7eu3QGN2I4RQ_KYjqIC5m9P5R96o",
  authDomain: "codeexp-4dd7b.firebaseapp.com",
  projectId: "codeexp-4dd7b",
  storageBucket: "codeexp-4dd7b.appspot.com",
  messagingSenderId: "564585510517",
  appId: "1:564585510517:web:d25d989e3bef91f5846a3c",
  measurementId: "G-XNFTCQP1BE"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);
