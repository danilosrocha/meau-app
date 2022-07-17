// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAMwZrL0n_8QL2RZV9rrri74EViWCF-oM",
  authDomain: "meauapp-36487.firebaseapp.com",
  projectId: "meauapp-36487",
  storageBucket: "meauapp-36487.appspot.com",
  messagingSenderId: "786510371209",
  appId: "1:786510371209:web:faf0595b65dcb24967a958"
};

// Initialize Firebase
let app;
if( firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

export { auth };

const db = firebase.firestore()
export {db};