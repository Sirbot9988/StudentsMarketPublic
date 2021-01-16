import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

var firebaseConfig = {
  apiKey: "AIzaSyCQ1QksR2lqnbWdSBSb7Z0Hec7vYgwtuP4",
  authDomain: "studentsmarket-6a095.firebaseapp.com",
  projectId: "studentsmarket-6a095",
  storageBucket: "studentsmarket-6a095.appspot.com",
  messagingSenderId: "787165538985",
  appId: "1:787165538985:web:02b113ae272e6ff87457b8",
  measurementId: "G-Y8QJ0RGJYC"
};
  // // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();
const firestore = firebase.firestore();

export {app, analytics, firestore}

