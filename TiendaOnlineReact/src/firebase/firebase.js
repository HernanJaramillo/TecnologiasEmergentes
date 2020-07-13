import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAuxgV0Fm7QSJmRUUUm0KBwXpJbp9fv1hs",
  authDomain: "tiendaonline-6a97f.firebaseapp.com",
  databaseURL: "https://tiendaonline-6a97f.firebaseio.com",
  projectId: "tiendaonline-6a97f",
  storageBucket: "tiendaonline-6a97f.appspot.com",
  messagingSenderId: "747119541984",
  appId: "1:747119541984:web:d7292dce67a304ecddda85"
  };

   firebase.initializeApp(config)

   export const ref = firebase.database().ref()
   export const firebaseAuth = firebase.auth