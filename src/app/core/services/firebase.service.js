import firebase from "firebase/app";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMQgF8ianHziUaYPVp4YWChVD26hWv8ow",
  authDomain: "datn-76aec.firebaseapp.com",
  projectId: "datn-76aec",
  storageBucket: "datn-76aec.appspot.com",
  messagingSenderId: "951244221191",
  appId: "1:951244221191:web:3f6590a36efca7dd77b3a2",
  measurementId: "G-ZBF0YW70EZ",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as defaul };
