import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA5o8IgB03B5mk4n8uR9EoeQ9Y7Y4i1VcM",
  authDomain: "ecommerce-7fec4.firebaseapp.com",
  databaseURL: "https://ecommerce-7fec4.firebaseio.com",
  projectId: "ecommerce-7fec4",
  storageBucket: "",
  messagingSenderId: "734886683249",
  appId: "1:734886683249:web:21eabe3f4a5777bb"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
