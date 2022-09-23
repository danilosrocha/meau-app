// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// import "firebase/messaging";

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
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const storage = firebase.storage(app)
const auth = firebase.auth(app)
const db = firebase.firestore(app)
// const messaging = firebase.messaging();

export { auth, db, storage };