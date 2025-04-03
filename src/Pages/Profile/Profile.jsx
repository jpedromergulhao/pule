import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Profile.css";
import icon from "../../assets/home-icon.png";
import defaultPhoto from "../../assets/avatar1.jpg";

function Profile() {

    const user = useSelector((state) => state.user);

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

    const unlockedAchievements = achievements.filter(achievement => {
        // Lógica para achievements baseados em Capibas
        if (achievement.title === "Poupança Capiba" && userStats.capiba >= 50) return true;
        if (achievement.title === "Guardião do Tesouro" && userStats.capiba >= 100) return true;
        if (achievement.title === "Milionário do Frevo" && userStats.capiba >= 200) return true;
    
        // Todos os outros achievements sempre aparecem
        return !["Poupança Capiba", "Guardião do Tesouro", "Milionário do Frevo"].includes(achievement.title);
    });

    return (
        <div className="profile-container">
            {/* Header com informações básicas */}
            <div className="profile-header" data-aos="fade-down">
                <div className="profile-avatar">
                    <img src={user.profilePic || defaultPhoto} alt="Avatar da Ana" />
                    <div className="level-badge">{userLevel.name}</div>
                </div>
                <div className="profile-info">
                    <h1>{userStats.name || "usuário"}</h1>
                    <p>ID: #{userStats.id || "id"}</p>
                    <div className="login-method">
                        <span className="gov-br-badge">{userStats.email || "email"}</span>
                    </div>
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

            {/* Mascote */}
            <div className="mascot-guide" data-aos="fade-left">
                <img src={icon} alt="Logo Pule!" />
                <div className="mascot-message">
                    <p>Continue participando do carnaval para ganhar mais moedas e subir de nível!</p>
                </div>
            </div>
        </div>
    );
}

export default Profile; 