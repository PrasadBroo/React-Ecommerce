import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyA-HgwJp8rLMYP_jIzTw-FJPvEMV8sKFGw",
    authDomain: "e-commerce-app-932ee.firebaseapp.com",
    databaseURL: "https://e-commerce-app-932ee.firebaseio.com",
    projectId: "e-commerce-app-932ee",
    storageBucket: "e-commerce-app-932ee.appspot.com",
    messagingSenderId: "551338789984",
    appId: "1:551338789984:web:1d3f5f6a551190137c0705"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth;
export const firestore = firebase.firestore;