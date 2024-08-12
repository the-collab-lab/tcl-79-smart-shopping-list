import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyC4rKWbeuFoe8URakxp2oei_GIzqsSWFrg',
	authDomain: 'tcl-79-smart-shopping-list.firebaseapp.com',
	projectId: 'tcl-79-smart-shopping-list',
	storageBucket: 'tcl-79-smart-shopping-list.appspot.com',
	messagingSenderId: '141815834662',
	appId: '1:141815834662:web:a40412a9106b2a470f9ee7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
