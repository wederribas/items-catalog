import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDjVVHgh077_msL3pIQU3K_gI70yaz17iA',
  authDomain: 'udacity-items-catalog.firebaseapp.com',
  databaseURL: 'https://udacity-items-catalog.firebaseio.com',
  projectId: 'udacity-items-catalog',
  storageBucket: 'udacity-items-catalog.appspot.com',
  messagingSenderId: '707782877400',
}

firebase.initializeApp(config)

export const provider = new firebase.auth.GoogleAuthProvider()
export const firebaseAuth = firebase.auth()
