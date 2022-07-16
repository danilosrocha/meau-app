// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
<<<<<<< HEAD
  apiKey: "AIzaSyCVTSjPALsTUtWaP0WkO_tkCvpck0cbylI",
  authDomain: "meau-app-2798c.firebaseapp.com",
  projectId: "meau-app-2798c",
  storageBucket: "meau-app-2798c.appspot.com",
  messagingSenderId: "959568155326",
  appId: "1:959568155326:web:e175d6899173fb350f44ef",
  measurementId: "G-SF4TFR6XR9"
=======
  apiKey: "AIzaSyCAMwZrL0n_8QL2RZV9rrri74EViWCF-oM",
  authDomain: "meauapp-36487.firebaseapp.com",
  projectId: "meauapp-36487",
  storageBucket: "meauapp-36487.appspot.com",
  messagingSenderId: "786510371209",
  appId: "1:786510371209:web:faf0595b65dcb24967a958"
>>>>>>> b33dee797fab2f7c0b5b7cde8656ef517544d70a
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