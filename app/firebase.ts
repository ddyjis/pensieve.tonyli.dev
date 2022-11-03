import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "tonyli-pensieve.firebaseapp.com",
  databaseURL: "https://tonyli-pensieve.firebaseio.com",
  projectId: "tonyli-pensieve",
  storageBucket: "tonyli-pensieve.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
