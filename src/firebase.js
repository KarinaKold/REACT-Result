// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDUBJ36S4kDOydQeMZEcFeCpQ0EFz3kTt4',
	authDomain: 'todolist-b8afd.firebaseapp.com',
	projectId: 'todolist-b8afd',
	storageBucket: 'todolist-b8afd.firebasestorage.app',
	messagingSenderId: '548782380780',
	appId: '1:548782380780:web:8f2b22c9fa2921dfd537c9',
	databaseURL: 'https://todolist-b8afd-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
