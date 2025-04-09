import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import {
    GoogleAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider,
    EmailAuthProvider,
    reauthenticateWithPopup,
    reauthenticateWithCredential,
    deleteUser
} from "firebase/auth";
import { logoutUser, setProfilePic } from "../../redux/userSlice";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Profile.css";
import icon from "../../assets/home-icon.png";
import defaultPhoto from "../../assets/avatar1.jpg";

// Reautentica o usuário atual com base no provedor
const reauthenticateUser = async (user) => {
    if (!user) {
        throw new Error("Nenhum usuário autenticado.");
    }

    const providerId = user.providerData[0]?.providerId;

    let provider;

    if (providerId === "google.com") {
        provider = new GoogleAuthProvider();
        return reauthenticateWithPopup(user, provider);
    }

    if (providerId === "facebook.com") {
        provider = new FacebookAuthProvider();
        return reauthenticateWithPopup(user, provider);
    }

    if (providerId === "github.com") {
        provider = new GithubAuthProvider();
        return reauthenticateWithPopup(user, provider);
    }

    if (providerId === "password") {
        // Solicita email/senha novamente
        const email = user.email;
        const password = prompt("Antes de seguir, precisamos da sua senha para confirmar que você realmente deseja excluir sua conta. 😢");

        if (!password) {
            throw new Error("Senha não fornecida.");
        }

        const credential = EmailAuthProvider.credential(email, password);
        return reauthenticateWithCredential(user, credential);
    }

    throw new Error("Provedor de login não suportado.");
};

function Profile() {
    const user = useSelector((state) => state.user);
    const [croppedImage, setCroppedImage] = useState(() => {
        return localStorage.getItem("profilePic") || user.profilePic;
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user.profilePic, user]);

    const [userLevel] = useState({
        current: 1,
        progress: 75,
        name: "Passista",
        nextLevel: "Brincante"
    });

    const [userStats] = useState({
        capiba: user.capiba,
        profilePic: user.profilePic,
        name: user.name,
        id: user.id,
        email: user.email,
        completedMissions: 15,
        totalMissions: 20,
        achievements: 8
    });

    const achievements = [
        {
            icon: "😊",
            title: "Primeiros Passos",
            description: "Completou sua primeira missão no Pule!"
        },
        {
            icon: "🪙",
            title: "Poupança Capiba",
            description: "Acumulou 50 moedas Capibas"
        },
        {
            icon: "💎",
            title: "Guardião do Tesouro",
            description: "Acumulou 100 moedas Capibas"
        },
        {
            icon: "💰",
            title: "Milionário do Frevo",
            description: "Acumulou 200 moedas Capibas"
        },
        {
            icon: "🗺️",
            title: "Explorador(a) Iniciante",
            description: "Visitou 5 pontos no mapa de Recife"
        },
        {
            icon: "🥳",
            title: "Folião",
            description: "Participou de 5 blocos diferentes"
        },
        {
            icon: "🎉",
            title: "Festeiro(a)",
            description: "Participou de 10 shows diferentes no Marco Zero"
        },
        {
            icon: "🐓",
            title: "Folião do Galo",
            description: "Esteve no desfile do Galo da Madrugada"
        }
    ];

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    useEffect(() => {
        if (croppedImage) {
            localStorage.setItem("profilePic", croppedImage);
        }
    }, [croppedImage]);

    useEffect(() => {
        const savedPic = localStorage.getItem("profilePic");
        if (savedPic) {
            setCroppedImage(savedPic);
            dispatch(setProfilePic(savedPic));
        }
    }, [dispatch]);

    const unlockedAchievements = achievements.filter(achievement => {
        // Lógica para achievements baseados em Capibas
        if (achievement.title === "Poupança Capiba" && userStats.capiba >= 50) return true;
        if (achievement.title === "Guardião do Tesouro" && userStats.capiba >= 100) return true;
        if (achievement.title === "Milionário do Frevo" && userStats.capiba >= 200) return true;

        // Todos os outros achievements sempre aparecem
        return !["Poupança Capiba", "Guardião do Tesouro", "Milionário do Frevo"].includes(achievement.title);
    });

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm("😢 Tem certeza? Ao deletar sua conta, você perderá todas as informações salvas. Deseja continuar?");
        if (!confirmed) return;
    
        const user = auth.currentUser;
        if (!user) return alert("🚫 Ops! Parece que ninguém está autenticado no momento.");
    
        try {
            await reauthenticateUser(user);
            await deleteUser(user);
    
            dispatch(logoutUser());
            localStorage.clear();
            sessionStorage.clear();
            setTimeout(() => navigate("/"), 100);
        } catch (error) {
            console.error("Erro ao deletar conta:", error);
            alert("🛑 Erro ao apagar a conta. Se ainda quiser continuar, tente mais uma vez.");
        }
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
                    dispatch(setProfilePic(cropped));
                } catch (err) {
                    console.error("Erro ao recortar a imagem:", err);
                    alert("🚫 Erro ao carregar a imagem. Experimente outra foto! 🤳");
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="profile-container">
            {/* Header com informações básicas */}
            <div className="profile-header" data-aos="fade-down">
                <div className="profile-avatar">
                    <div className="profile-picture" onClick={() => document.getElementById("fileInput").click()}>
                        <img src={croppedImage || defaultPhoto} alt="Foto de perfil" />
                        <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            className="profileInput"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="level-badge">{userLevel.name}</div>
                </div>
                <div className="profile-info">
                    <h1>{userStats.name || "usuário"}</h1>
                    <p>ID: #{userStats.id || "id"}</p>
                </div>
            </div>

            {/* Seção de Moedas Capibas */}
            <div className="coins-section" data-aos="fade-right">
                <div className="coins-card">
                    <h2>Moedas Capibas</h2>
                    <div className="coins-amount">
                        <span className="coin-icon">🪙</span>
                        <span className="amount">{userStats.capiba || 0}</span>
                    </div>
                </div>
            </div>

            {/* Barra de Progresso do Nível */}
            <div className="level-progress" data-aos="fade-up">
                <div className="level-info">
                    <h3>Nível: {userLevel.name}</h3>
                    <span>Próximo nível: {userLevel.nextLevel}</span>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${userLevel.progress}%` }}
                    ></div>
                </div>
                <div className="progress-text">
                    <span>{userLevel.progress}%</span>
                </div>
            </div>

            {/* Missões Concluídas */}
            <div className="missions-section" data-aos="fade-left">
                <h3>Missões Concluídas</h3>
                <div className="missions-progress">
                    <div className="missions-bar">
                        <div
                            className="missions-fill"
                            style={{ width: `${(userStats.completedMissions / userStats.totalMissions) * 100}%` }}
                        ></div>
                    </div>
                    <div className="missions-text">
                        <span>{userStats.completedMissions}/{userStats.totalMissions} missões</span>
                    </div>
                </div>
            </div>

            {/* Conquistas */}
            <div className="achievements-section" data-aos="fade-up">
                <h3>Conquistas</h3>
                <div className="achievements-grid">
                    {unlockedAchievements.map((achievement, index) => (
                        <div key={index} className="achievement-card">
                            <div className="achievement-icon">{achievement.icon}</div>
                            <div className="achievement-info">
                                <h4>{achievement.title}</h4>
                                <p>{achievement.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Logo */}
            <div className="mascot-guide" data-aos="fade-left">
                <img src={icon} alt="Logo Pule!" />
                <div className="mascot-message">
                    <p>Continue participando do carnaval para ganhar mais moedas e subir de nível!</p>
                </div>
            </div>

            {/* Deletar a conta */}
            <div className="delete-account-section" data-aos="fade-up">
                <button aria-label="Deletar a conta" className="delete-account-btn" onClick={handleDeleteAccount}>
                    Deletar Conta
                </button>
            </div>
        </div>
    );
}

export default Profile; 