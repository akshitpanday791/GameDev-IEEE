import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyC9us5ST-sjQvun_3xBHHJFr9HZ-yRZLfI",
    authDomain: "gamedev-ieee-fa492.firebaseapp.com",
    projectId: "gamedev-ieee-fa492",
    storageBucket: "gamedev-ieee-fa492.appspot.com",
    messagingSenderId: "478980420072",
    appId: "1:478980420072:web:cd6a150bc9c3ae04edf45d",
    measurementId: "G-MNW38ETMMS"
  };
  
  
  // Initialize Firebase
const app =  firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export default app;