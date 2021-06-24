import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyA1vwlxVLI534yzi-FP7Ungm1z_pHUecDc",
  authDomain: "gamedev-ieee-38b6c.firebaseapp.com",
  projectId: "gamedev-ieee-38b6c",
  storageBucket: "gamedev-ieee-38b6c.appspot.com",
  messagingSenderId: "889014154958",
  appId: "1:889014154958:web:747ac1d06e5b92b73d429f"
};
  
  
  // Initialize Firebase
const app =  firebase.initializeApp(firebaseConfig);
const auth = app.auth();
export {app , auth};