
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDFgzJVFs-C5yuPyNR4r8L8XnOOGZAEKgQ",
  authDomain: "registration-75537.firebaseapp.com",
  databaseURL: 'https://registration-75537-default-rtdb.asia-southeast1.firebasedatabase.app/',
  projectId: "registration-75537",
  storageBucket: "registration-75537.appspot.com",
  messagingSenderId: "231253683643",
  appId: "1:231253683643:web:f21dc9b03ee58e4a9a289e"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

export { firebase, auth, database, storage }