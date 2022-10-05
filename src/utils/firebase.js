import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  where,
  query,
  getDocs
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const usersRef = collection(db, 'users');

export const addData = async () => {
  try {
    const docRef = await addDoc(usersRef, {
      name: 'Saakar Gogia',
      email: 'saakarg615@gmail.com',
      age: 20
    });
    console.log('Document Written: ', docRef);
  } catch (err) {
    console.error('Error encountered: ', err);
  }
};

export const createUser = async ({ name, email, password }) => {
  try {
    const userRef = await addDoc(usersRef, {
      name,
      email,
      password
    });
    console.log('User created: ', userRef);
  } catch (err) {
    console.error(err);
  }
};

export const getUser = async email => {
  try {
    const q = query(usersRef, where('email', '==', email));
    const userRef = await getDocs(q);
  } catch (err) {
    console.error(err);
  }
};
