import firebase from "firebase/app";
import "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyB242CHMvK0F6kQmTquVww9R0mTPeXhVM4",
  authDomain: "services-auth-a2c34.firebaseapp.com",
  databaseURL: "https://services-auth-a2c34-default-rtdb.firebaseio.com",
  projectId: "services-auth-a2c34",
  storageBucket: "services-auth-a2c34.appspot.com",
  messagingSenderId: "357465114668",
  appId: "1:357465114668:web:ed329adebb141256392989",
  measurementId: "G-1XY38FR8VF",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
