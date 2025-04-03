import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { v4 as uuidv4 } from 'uuid';
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home.css";
import logo1 from "../../assets/home-icon.png";

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

const generateNumericId = () => {
    return parseInt(uuidv4().replace(/\D/g, "").slice(0, 8), 10);
};

const createImage = (url) => new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = reject;
});

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showRegister, setShowRegister] = useState(false);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [croppedImage, setCroppedImage] = useState(null);
    const logoDiv = useRef();
    const emailInput = useRef();

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const handleEmail = () => {
        const input = emailInput.current;
        const emailValue = input.value;
        setEmail(emailValue);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            input.setCustomValidity("Por favor, insira um e-mail válido.");
        } else {
            input.setCustomValidity("");
        }
        input.reportValidity();
    };

    const handleLogin = () => {
        const user = localStorage.getItem("user");
        if (user) {
            localStorage.setItem("userRegistered", "true");
            navigate("/mapa");
        } else {
            alert("😕 Parece que não encontramos o seu cadastro. Que tal fazer um? 🎉");
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const cropped = await getCroppedImg(reader.result, 1024);
                setCroppedImage(cropped);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRegister = () => {
        if (name.trim() && surname.trim() && email.trim() && croppedImage) {
            const user = {
                name: name.trim(),
                surname: surname.trim(),
                email: email.trim(),
                profilePic: croppedImage,
                capiba: Math.floor(Math.random() * 201),
                id: generateNumericId(),
                availableRewards: []
            };
    
            // Atualiza Redux
            dispatch(setUser(user));
    
            // Atualiza localStorage
            localStorage.setItem("user", JSON.stringify(user));
    
            // Aguarda a atualização do estado antes da navegação
            setTimeout(() => navigate("/mapa"), 100);
        } else {
            alert("Preencha todos os campos antes de continuar.");
        }
    };

    const handleClick = () => {
        logoDiv.current.style.display = 'none';
        setShowRegister(true)
    }

    return (
        <div className="home">
            <div className="content">
                <div className="logo" ref={logoDiv}>
                    <img src={logo1} alt="Logo Pule!" data-aos="zoom-in" />
                    <h1 data-aos="fade-right">Pule!</h1>
                    <span data-aos="fade-right">
                        Colete moedas capibas e ajude a transformar o carnaval do Recife.
                    </span>
                </div>

                {!showRegister ? (
                    <div className="logins">
                        <button onClick={handleClick} className="btns">Fazer meu cadastro</button>
                        <button onClick={handleLogin} className="guestBtn">Já tenho cadastro</button>
                    </div>
                ) : (
                    <div className="register">
                        <input type="text" placeholder="Nome" className="texts" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="text" placeholder="Sobrenome" className="texts" value={surname} onChange={(e) => setSurname(e.target.value)} />
                        <input type="email" placeholder="E-mail" className="texts" ref={emailInput} value={email} onChange={handleEmail} />

                        <label htmlFor="fileInput" className="imageInput-label">Escolher imagem de perfil</label>
                        <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            className="imageInput"
                            onChange={handleFileChange}
                        />

                        {croppedImage && <img src={croppedImage} alt="Perfil" className="profile-preview" />}

                        <button onClick={handleRegister} className="btns">Ir para a folia</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
