import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAvgc-kOIkdIf2PcZsS2eV2rndsCN7bjp8",
  authDomain: "tasks-66984.firebaseapp.com",
  projectId: "tasks-66984",
  storageBucket: "tasks-66984.appspot.com",
  messagingSenderId: "510780724988",
  appId: "1:510780724988:web:9d27a0409dc9dc12d7e979",
  measurementId: "G-58QC85XX58"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase