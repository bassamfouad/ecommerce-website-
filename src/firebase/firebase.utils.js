import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBvkG8tTxYwvewvsDHnNRMGbcngvwHufSw",
  authDomain: "clothecom-7c61a.firebaseapp.com",
  databaseURL: "https://clothecom-7c61a.firebaseio.com",
  projectId: "clothecom-7c61a",
  storageBucket: "clothecom-7c61a.appspot.com",
  messagingSenderId: "799455752826",
  appId: "1:799455752826:web:8fd17e378c1ee53c5dc1c3",
  measurementId: "G-3S1P3KDEW6"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
