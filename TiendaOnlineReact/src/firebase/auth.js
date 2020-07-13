import { firebaseAuth } from '../firebase/firebase'

export function login (email, pw) {
    return firebaseAuth().signInWithEmailAndPassword(email, pw)
  }
  
  export function logout () {
    return firebaseAuth().signOut()
  }