// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from
        "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBpQu_RPgIEfgQ2oED7OPG62Fet0LSjrqM",
    authDomain: "tpf-lab2-5396b.firebaseapp.com",
    projectId: "tpf-lab2-5396b",
    storageBucket: "tpf-lab2-5396b.appspot.com",
    messagingSenderId: "887218672607",
    appId: "1:887218672607:web:38d24f8ebe5bfa7dcb6a6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");

const userSignIn = async () => {
    signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        console.log(user);

        localStorage.setItem('userToken', user.accessToken);

        // Inject the user's first name, last name, and email into the form fields
        document.getElementById('firstName').value = user.displayName.split(' ')[0];
        document.getElementById('lastName').value = user.displayName.split(' ')[1];
        document.getElementById('exampleInputEmail1').value = user.email;
        console.log("tu")

    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error(`Error Code: ${errorCode}`);
        console.error(`Error Message: ${errorMessage}`);

        // Display error message to the user
        alert(`Wystąpił błąd podczas autentykacji: ${errorMessage}`);
    })
}
const userSignOut = async () => {
    signOut(auth).then(() => {
        alert("You have been signed out!")
        localStorage.removeItem('userToken');

        // Clear the form fields
        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('exampleInputEmail1').value = '';
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        alert("You are authenticated with Google");
        console.log(user);
    }
})

signInButton.addEventListener("click",
    userSignIn);
signOutButton.addEventListener("click",
    userSignOut);

