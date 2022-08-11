import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  projectId: "tweeter-devchallenges",
  /*  
    apiKey: "AIzaSyBnTk4YDScX_QzEMuiu3A0vMhrv9k7YwoM",
    appId: "1:626850324834:web:cc275074b8ea7c4f0a0c3b",
  authDomain: "tweeter-devchallenges.firebaseapp.com",
  databaseURL: "https://tweeter-devchallenges.firebaseio.com",
  storageBucket: "tweeter-devchallenges.appspot.com",
  messagingSenderId: "626850324834", */
};

const app = !getApps().length
  ? initializeApp({ projectId: "tweeter-devchallenges" })
  : getApp();
const db = getFirestore(app);

export { app, db };
