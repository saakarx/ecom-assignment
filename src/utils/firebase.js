import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  where,
  query,
  getDocs
} from 'firebase/firestore';
import bcrypt from 'bcryptjs';

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
  const userRef = await addDoc(usersRef, {
    name,
    email,
    password
  });
  return;
};

export const searchUser = async email => {
  try {
    const q = query(usersRef, where('email', '==', email));
    const userRef = await getDocs(q);

    if (userRef.docs.length > 0) return userRef.docs[0].data();
    else return false;
  } catch (err) {
    console.error(err);
  }
};

export const login = async (email, password) => {
  const user = await searchUser(email);
  // if the user does not exist throw an error
  if (!user) throw new Error('User does not exist!');
  // check if the password match with the hash
  const passMatch = await bcrypt.compare(password, user.password);
  if (passMatch && user) return { email: user.email, name: user.name };
  else throw new Error('Invalid credentials');
};
