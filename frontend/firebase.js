import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDnh24CarTCMTWwwryeGSMHx_IfEAI_SH4",
    authDomain: "todolist-8ee41.firebaseapp.com",
    projectId: "todolist-8ee41",
    storageBucket: "todolist-8ee41.firebasestorage.app",
    messagingSenderId: "121670643809",
    appId: "1:121670643809:web:8a110d98d7216ac1373a20"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);