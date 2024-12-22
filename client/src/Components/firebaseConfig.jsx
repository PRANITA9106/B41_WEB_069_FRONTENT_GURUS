
import { initializeApp } from "firebase/app"; 
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
    apiKey: "AIzaSyCX9QAL5z9UsTdRis2TZB43VtPCLpaPel4",
    authDomain: "curd-movies.firebaseapp.com",
    databaseURL: "https://curd-movies-default-rtdb.firebaseio.com",
    projectId: "curd-movies",
    storageBucket: "curd-movies.firebasestorage.app",
    messagingSenderId: "600281269298",
    appId: "1:600281269298:web:c08321be762d19617e282b"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth }; 
