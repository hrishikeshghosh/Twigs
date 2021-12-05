import firebase from "firebase";
import keys from "./keys.js";

const database = firebase.initializeApp(keys.firebaseConfig);

export default database;
