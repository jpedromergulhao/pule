import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, setPersistence, browserLocalPersistence } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCx8ijdr4MWUWt3J4UoiCVERGl4vXlc2dw",
    authDomain: "pule-b84bd.firebaseapp.com",
    projectId: "pule-b84bd",
    storageBucket: "pule-b84bd.firebasestorage.app",
    messagingSenderId: "972456756383",
    appId: "1:972456756383:web:8d2467a6a251e5e7290eaa",
    measurementId: "G-S7BR4TW3Z4"
};

// Inicializa o app e a autenticação
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Configura persistência local (manter login mesmo após refresh)
setPersistence(auth, browserLocalPersistence)
  .then(() => console.log("Persistência configurada: local"))
  .catch((error) => console.error("Erro ao configurar persistência:", error));

// Provedores de login
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, facebookProvider, githubProvider };
