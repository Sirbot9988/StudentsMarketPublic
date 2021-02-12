import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

var firebaseConfig = {
// FIREBASE SDK CONFIG
};
  // // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();
const firestore = firebase.firestore();

export {app, analytics, firestore}

