import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  where,
  query,
  getDocs,
  doc,
  updateDoc
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
const cartRef = collection(db, 'cart');

export const userExists = async email => {
  const q = query(usersRef, where('email', '==', email));
  const userRef = await getDocs(q);

  if (userRef.docs.length > 0) {
    const user = {
      id: userRef.docs[0].id,
      ...userRef.docs[0].data()
    };
    return user;
  } else return false;
};
export const createUser = async ({ name, email, password }) => {
  const userRef = await addDoc(usersRef, {
    name,
    email,
    password
  });
  createCart(userRef);
  return;
};
export const login = async (email, password) => {
  const user = await userExists(email);
  // if the user does not exist throw an error
  if (!user) throw new Error('User does not exist!');
  // check if the password match with the hash
  const passMatch = await bcrypt.compare(password, user.password);
  if (passMatch && user)
    return { email: user.email, name: user.name, id: user.id };
  else throw new Error('Invalid credentials');
};
const createCart = async userRef => {
  await addDoc(cartRef, {
    userId: userRef.id,
    quantity: 0,
    items: []
  });
};
export const searchCart = async userId => {
  const q = query(cartRef, where('userId', '==', userId));
  const cartDoc = await getDocs(q);

  const cart = {
    id: cartDoc.docs[0].id,
    ...cartDoc.docs[0].data()
  };
  return cart;
};
export const updateCartItem = async (cartId, data) => {
  const cartItem = doc(cartRef, cartId);
  await updateDoc(cartItem, {
    quantity: data.quantity,
    items: data.items
  });
};
