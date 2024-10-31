// src/Firebase.js

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDi5B9roo9nQ0VFfb4sWDrZM0WpIYKiqPQ",
  authDomain: "wildlifedu-website.firebaseapp.com",
  projectId: "wildlifedu-website",
  storageBucket: "wildlifedu-website.appspot.com",
  messagingSenderId: "252121860688",
  appId: "1:252121860688:web:c8bec950ce14ce8f7b5f55",
  measurementId: "G-F5F9G7KD78",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app); // For authentication
const db = getFirestore(app); // For Firestore (database)

// Firebase Authentication Functions
const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error during sign up:", error.message);
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error;
  }
};

// Firestore Functions for Posts
const addPost = async (post) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), post);
    console.log("Post added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding post:", error.message);
    throw error;
  }
};

const getPosts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    throw error;
  }
};

const updatePost = async (id, updatedData) => {
  try {
    const postRef = doc(db, "posts", id);
    await updateDoc(postRef, updatedData);
    console.log("Post updated:", id);
  } catch (error) {
    console.error("Error updating post:", error.message);
    throw error;
  }
};

// Export Firebase services and functions
export { auth, db, signUp, login, addPost, getPosts, updatePost };
