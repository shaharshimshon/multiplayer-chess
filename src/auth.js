import { auth } from './firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js";

document.getElementById('login-btn').onclick = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      showGame();
    }).catch(e => alert(e.message));
};

document.getElementById('signup-btn').onclick = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      showGame();
    }).catch(e => alert(e.message));
};

document.getElementById('logout-btn').onclick = () => {
  signOut(auth).then(() => location.reload());
};

auth.onAuthStateChanged(user => {
  if (user) showGame();
});

function showGame() {
  loginScreen.style.display = 'none';
  gameScreen.style.display = 'block';
}
