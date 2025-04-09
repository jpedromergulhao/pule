import React, { useContext, useRef, useState } from "react";
import { setUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../context/AuthContext";
import { LogoContext } from "../../Pages/Home/Home";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import zxcvbn from 'zxcvbn';
import bcrypt from 'bcryptjs';
import photoIcon from '../../assets/photo.png';
import './Register.css';

function Register() {
    const [name, setName] = useState(""); // user name
    const [surname, setSurname] = useState(""); // user surname
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [croppedImage, setCroppedImage] = useState(null); // Profile image
    const [passwordScore, setPasswordScore] = useState(0); // password strengh score
    const { setShowRegister, storedUser, generateNumericId } = useContext(AuthContext);
    const emailInput = useRef();
    const passwordInput = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch(); // redux
    const logoDiv = useContext(LogoContext);

    const handleEmail = () => {
        const input = emailInput.current;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(registerEmail)) {
            input.setCustomValidity("Por favor, insira um e-mail válido.");
        } else {
            input.setCustomValidity("");
        }
        input.reportValidity();
    };

    const getCroppedImg = async (imageSrc, maxSize = 1024) => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) return null;

        const size = Math.min(image.naturalWidth, image.naturalHeight);
        const safeX = (image.naturalWidth - size) / 2;
        const safeY = (image.naturalHeight - size) / 2;

        canvas.width = maxSize;
        canvas.height = maxSize;

        ctx.drawImage(
            image,
            safeX, safeY, size, size,
            0, 0, maxSize, maxSize
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) return reject(new Error("Erro ao converter a imagem."));
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => resolve(reader.result);
            }, "image/jpeg", 0.7);
        });
    };

    const createImage = (url) => new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = reject;
    });

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        if (!file.type.startsWith("image/")) {
            return alert("👉 Por favor, escolha uma imagem para enviar!");
        }

        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                try {
                    const cropped = await getCroppedImg(reader.result, 1024);
                    setCroppedImage(cropped);
                } catch (err) {
                    console.error("Erro ao recortar a imagem:", err);
                    alert("🚫 Erro ao carregar a imagem. Experimente outra foto! 🤳");
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePassword = (event) => {
        const newPassword = event.target.value;
        setRegisterPassword(newPassword);

        const evaluation = zxcvbn(newPassword);
        setPasswordScore(evaluation.score);
    }

    const handleReturn = () => {
        logoDiv.current.style.display = 'flex';
        setShowRegister(false);
    }

    const capitalize = (str) =>
        str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

    const handleRegister = async () => {
        handleEmail();
        const trimmedName = name.trim().replace(/\s+/g, ' ');
        const trimmedSurname = surname.trim().replace(/\s+/g, ' ');
        const normalizedEmail = registerEmail.trim().toLowerCase();
        const trimmedPassword = registerPassword.trim();

        if (!registerPassword || passwordScore < 3)
            return alert("⚠️ Ops! Que tal criar uma senha mais forte para sua segurança?");

        if (storedUser?.email === normalizedEmail) 
            return alert("⚠️ Eita! Já tem uma conta com esse e-mail.\n\nSe quiser criar uma nova, entra na antiga rapidinho e apaga ela primeiro, beleza?");

        if (trimmedName && trimmedSurname && normalizedEmail && trimmedPassword) {
            try {
                const auth = getAuth();
                // Cria o usuário no Firebase Auth
                const userCredential = await createUserWithEmailAndPassword(auth, normalizedEmail, trimmedPassword);

                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(trimmedPassword, salt);

                const newUser = {
                    uid: userCredential.user.uid, // UID do Firebase
                    name: capitalize(trimmedName),
                    surname: capitalize(trimmedSurname),
                    email: normalizedEmail,
                    password: hashedPassword,
                    profilePic: croppedImage,
                    capiba: Math.floor(Math.random() * 201),
                    id: generateNumericId(),
                    availableRewards: []
                };

                dispatch(setUser(newUser));
                localStorage.setItem("user", JSON.stringify(newUser));
                localStorage.setItem("userRegistered", "true");

                setTimeout(() => {
                    navigate("/mapa");
                    setShowRegister(false);
                }, 100);
            } catch (error) {
                console.error("Erro ao registrar no Firebase:", error);
                alert("❌ Ocorreu um erro ao criar a conta: " + error.message + ". Tente novamente.");
            }
        } else {
            alert("⚠️ Preencha todos os campos antes de continuar.");
        }
    };

    return (
        <div className="register">
            <div className="inputs">
                <div className="name">
                    <input type="text" required aria-label="Registrar o nome" placeholder="Nome" className="texts" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="text" aria-label="Registar o sobrenome" placeholder="Sobrenome" className="texts" value={surname} onChange={(e) => setSurname(e.target.value)} />
                </div>
                <input
                    type="email"
                    aria-label="Registrar o email"
                    placeholder="E-mail"
                    className="texts"
                    required
                    ref={emailInput}
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                />
                <input type="password" required aria-label="Registar a senha" placeholder="Crie sua senha" className="texts" ref={passwordInput} value={registerPassword} onChange={handlePassword} />
            </div>

            <div className="password-area">
                {registerPassword && (
                    <div className="password-strength">
                        <p>Senha:
                            <span style={{
                                color: ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#27ae60'][passwordScore]
                            }}>
                                {["Muito fraca", "Fraca", "Razoável", "Forte", "Muito forte"][passwordScore]}
                            </span>
                        </p>

                        <div className="password-strength-bar">
                            <div style={{
                                width: `${(passwordScore + 1) * 20}%`,
                                height: '8px',
                                backgroundColor: ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#27ae60'][passwordScore],
                                borderRadius: '4px',
                                transition: 'width 0.3s ease'
                            }}></div>
                        </div>
                    </div>
                )}
            </div>

            <div className="profile-picture">
                <label htmlFor="fileInput" className="imageInput-label">
                    Foto de perfil
                    <img src={photoIcon} alt="Icone de foto" loading="lazy" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    className="imageInput"
                    aria-label="Registar a foto de perfil"
                    onChange={handleFileChange}
                />

                {croppedImage && <img src={croppedImage} alt="Perfil" className="profile-preview" />}
            </div>

            <button onClick={handleRegister} aria-label="Registrar o usuário" className="btns">Ir para a folia</button>
            <div className="login-register">
                <span>Já possui uma conta?</span>
                <button onClick={handleReturn} aria-label="Retornar ao login">Faça o login</button>
            </div>
        </div>
    )
}

export default Register;