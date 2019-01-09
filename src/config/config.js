import firebase from "@firebase/app";
import '@firebase/auth'
import '@firebase/storage'
import '@firebase/database'

const config = {
  apiKey: "AIzaSyAGTFDQnCQ0St727qC1YA7DjIKh7tx1BnI",
  authDomain: "fakegram-21e0b.firebaseapp.com",
  databaseURL: "https://fakegram-21e0b.firebaseio.com",
  projectId: "fakegram-21e0b",
  storageBucket: "fakegram-21e0b.appspot.com",
  messagingSenderId: "829188150768"
};
firebase.initializeApp(config);

export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
