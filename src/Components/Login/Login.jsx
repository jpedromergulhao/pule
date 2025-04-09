import React, { useState, useContext, useEffect } from "react";
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, facebookProvider, githubProvider } from '../../firebase';
import { AuthContext } from "../../context/AuthContext";
import { LogoContext } from "../../Pages/Home/Home";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import AOS from "aos";
import "aos/dist/aos.css";
import bcrypt from 'bcryptjs';
import './Login.css';
import googleIcon from '../../assets/google.png'
import facebookIcon from '../../assets/facebook.png';
import githubIcon from '../../assets/github.png';

function Login() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { setShowRegister, storedUser, setStoredUser, generateNumericId } = useContext(AuthContext);
    const logoDiv = useContext(LogoContext);
    const navigate = useNavigate();
    const dispatch = useDispatch(); // redux

    const buildCompleteUser = (user, stored) => ({
        name: user.displayName || stored.name || "Usuário",
        surname: stored.surname || "",
        email: user.email || stored.email,
        password: "",
        profilePic: user.photoURL || stored.profilePic || "",
        capiba: stored.capiba || Math.floor(Math.random() * 201),
        id: stored.id || generateNumericId(),
        availableRewards: stored.availableRewards || [],
    });


    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const handleClick = () => {
        logoDiv.current.style.display = 'none';
        setShowRegister(true);
    }

    const handleLogin = () => {
        setIsLoading(true);

        if (!loginEmail || !loginPassword) {
            alert("Preencha todos os campos! 😅");
            setIsLoading(false);
            return;
        }

        if (!storedUser) {
            alert("😕 Cadastro não encontrado...");
            setIsLoading(false);
            return;
        }

        if (!storedUser.password) {
            alert("👋 Oi de novo! Notamos que você já se cadastrou antes. Para acessar essa nova versão, será necessário apagar a conta anterior e se cadastrar novamente. 😉");
            setIsLoading(false);
            return;
        }

        const passwordMatch = bcrypt.compareSync(loginPassword, storedUser.password);

        if (passwordMatch && loginEmail === storedUser.email) {
            dispatch(setUser(storedUser));
            localStorage.setItem("userRegistered", "true");
            navigate("/mapa");
        } else {
            alert("⚠️ E-mail ou senha inválidos.");
        }
        setIsLoading(false);
    };

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            const stored = storedUser || {};
            const completeUser = buildCompleteUser(user, stored);

            dispatch(setUser(completeUser));
            setStoredUser(completeUser);
            localStorage.setItem('user', JSON.stringify(completeUser));
            navigate("/mapa");
        } catch (error) {
            console.error('Erro ao logar com o Google:', error);
            alert("⚠️ Não foi possível entrar com o Google. Que tal tentar de novo ou usar outro método?");
        }
    };

    const loginWithFacebook = async () => {
        try {
            const result = await signInWithPopup(auth, facebookProvider);
            const user = result.user;

            const stored = storedUser || {};
            const completeUser = buildCompleteUser(user, stored);

            dispatch(setUser(completeUser));
            setStoredUser(completeUser);
            localStorage.setItem('user', JSON.stringify(completeUser));
            navigate("/mapa");
        } catch (error) {
            console.error("Erro no login com Facebook:", error);
            alert("⚠️ Não foi possível entrar com o Facebook. Que tal tentar de novo ou usar outro método?");
        }
    };

    const loginWithGithub = async () => {
        try {
            const result = await signInWithPopup(auth, githubProvider);
            const user = result.user;

            const stored = storedUser || {};
            const completeUser = buildCompleteUser(user, stored);

            dispatch(setUser(completeUser));
            setStoredUser(completeUser);
            localStorage.setItem('user', JSON.stringify(completeUser));
            navigate("/mapa");
        } catch (error) {
            console.error("Erro no login com GitHub:", error);
            alert("⚠️ Não foi possível entrar com o GitHub. Que tal tentar de novo ou usar outro método?");
        }
    };

    return (
        <div data-aos="fade-left">
            <div className="login">
                <input type="email" required placeholder="E-mail" aria-label="Email para login" className="texts" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                <input type="password" required placeholder="Senha" aria-label="Senha para login" className="texts" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                <button
                    aria-label="Fazer login"
                    onClick={handleLogin}
                    className="btns"
                    disabled={isLoading}
                >
                    {isLoading ? "Carregando..." : "Fazer login"}
                </button>
            </div>

            <div className="login-social-media">
                <button aria-label="Login com o Google" onClick={loginWithGoogle} disabled={isLoading}>
                    <img src={googleIcon} alt="Google" loading="lazy" />
                </button>
                <button aria-label="Login com o Facebook" onClick={loginWithFacebook} disabled={isLoading}>
                    <img src={facebookIcon} alt="Facebook" loading="lazy" />
                </button>
                <button aria-label="Login com o GitHub" onClick={loginWithGithub} disabled={isLoading}>
                    <img src={githubIcon} alt="GitHub" loading="lazy" />
                </button>
            </div>

            <div className="login-register">
                <span>Não tem uma conta?</span>
                <button aria-label="Ir para o cadastro" onClick={handleClick} disabled={isLoading}>Faça o cadastro</button>
            </div>

            <div className="politic">
                <span>Verifique a</span>
                <Link to="/politica">
                    Política de Privacidade
                </Link>
            </div>
        </div>
    )
}

export default Login;