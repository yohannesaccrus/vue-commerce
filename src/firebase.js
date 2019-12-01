import firebase from 'firebase';
import 'firebase/storage';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCLEKMYA-JBkeYqkMLh48XTgk5ejkK5PsE",
    authDomain: "vue-commerce-6c2a4.firebaseapp.com",
    databaseURL: "https://vue-commerce-6c2a4.firebaseio.com",
    projectId: "vue-commerce-6c2a4",
    storageBucket: "vue-commerce-6c2a4.appspot.com",
    messagingSenderId: "484540985940",
    appId: "1:484540985940:web:3e11c5f4fd1c2605c6f3c1"
};

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { fb, db }