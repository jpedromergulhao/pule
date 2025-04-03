import React from "react";
import { useNavigate } from "react-router-dom";
import "./WeeklyMissions.css";

function WeeklyMissions({ activeCategory = "all" }) {
    const navigate = useNavigate();

    // Dados de exemplo para missões semanais
    const allMissions = [
        // Missões de turismo
        {
            id: 101,
            title: "Tour pelo Recife Antigo",
            description: "Visite ao menos 2 pontos turísticos no Recife Antigo",
            reward: 20,
            progress: {
                current: 0,
                total: 2
            },
            completed: false,
            category: "tourism"
        },
        {
            id: 102,
            title: "Conhecer museus de Recife",
            description: "Visite 1 museu em Recife",
            reward: 12,
            progress: {
                current: 0,
                total: 1
            },
            completed: false,
            category: "tourism"
        },
        {
            id: 103,
            title: "Gastronomia Pernambucana",
            description: "Visite 2 restaurantes tradicionais",
            reward: 15,
            progress: {
                current: 2,
                total: 2
            },
            completed: true,
            category: "tourism"
        },
        {
            id: 108,
            title: "Segredos do Marco Zero",
            description: "Descubra e fotografe 3 pontos icônicos do Marco Zero",
            reward: 18,
            progress: {
                current: 2,
                total: 3
            },
            completed: false,
            category: "tourism"
        },
        {
            id: 109,
            title: "Passeio pelos rios",
            description: "Faça um passeio de catamarã pelos rios de Recife",
            reward: 20,
            progress: {
                current: 0,
                total: 1
            },
            completed: false,
            category: "tourism"
        },
        {
            id: 110,
            title: "Arte e cultura popular",
            description: "Visite o Paço do Frevo e o Museu Cais do Sertão",
            reward: 15,
            progress: {
                current: 2,
                total: 2
            },
            completed: true,
            category: "tourism"
        },
        {
            id: 111,
            title: "Pontes e histórias",
            description: "Atravesse 3 das pontes mais famosas do Recife",
            reward: 12,
            progress: {
                current: 1,
                total: 3
            },
            completed: false,
            category: "tourism"
        },
    
        // Missões blocos
        {
            id: 104,
            title: "Rei dos blocos",
            description: "Participe de pelo menos 3 blocos diferentes em Recife",
            reward: 25,
            progress: {
                current: 1,
                total: 3
            },
            completed: false,
            category: "blocos"
        },
        {
            id: 105,
            title: "Folião antigo",
            description: "Vá a pelo menos 2 blocos no Recife antigo",
            reward: 12,
            progress: {
                current: 0,
                total: 2
            },
            completed: false,
            category: "blocos"
        },
        {
            id: 112,
            title: "Galo no pé!",
            description: "Vá ao desfile do Galo da Madrugada",
            reward: 30,
            progress: {
                current: 1,
                total: 1
            },
            completed: true,
            category: "blocos"
        },
        {
            id: 113,
            title: "Diversidade na folia",
            description: "Participe de um bloco temático (Ex: Bloco da Diversidade, Enquanto Isso na Sala da Justiça, Bloco dos Sujos)",
            reward: 20,
            progress: {
                current: 0,
                total: 1
            },
            completed: false,
            category: "blocos"
        },
        {
            id: 114,
            title: "Seguindo o trio",
            description: "Siga um trio elétrico por pelo menos 2 quarteirões",
            reward: 15,
            progress: {
                current: 0,
                total: 2
            },
            completed: false,
            category: "blocos"
        },
    
        // Missões de show
        {
            id: 106,
            title: "Rei da festa",
            description: "Vá a 4 shows do Recife Antigo",
            reward: 20,
            progress: {
                current: 1,
                total: 4
            },
            completed: false,
            category: "shows"
        },
        {
            id: 107,
            title: "Fã do frevo",
            description: "Participe de pelo menos 3 orquestras de frevo",
            reward: 30,
            progress: {
                current: 1,
                total: 3
            },
            completed: false,
            category: "shows"
        },
        {
            id: 115,
            title: "Frevo, maracatu e mais!",
            description: "Assista a pelo menos 3 estilos musicais diferentes em shows",
            reward: 25,
            progress: {
                current: 1,
                total: 3
            },
            completed: false,
            category: "shows"
        },
        {
            id: 116,
            title: "Noite de maracatu",
            description: "Presencie uma apresentação de maracatu ao vivo",
            reward: 20,
            progress: {
                current: 0,
                total: 1
            },
            completed: false,
            category: "shows"
        },
        {
            id: 117,
            title: "Homenagem ao mestre",
            description: "Vá a um show de dois artistas homenageados do Carnaval",
            reward: 18,
            progress: {
                current: 1,
                total: 2
            },
            completed: false,
            category: "shows"
        },
        {
            id: 118,
            title: "Carnaval até o fim!",
            description: "Participe de um show no último dia oficial do Carnaval",
            reward: 22,
            progress: {
                current: 0,
                total: 1
            },
            completed: false,
            category: "shows"
        }
    ];
    

    // Filtrar missões com base na categoria selecionada
    const filteredMissions = activeCategory === "all"
        ? allMissions
        : allMissions.filter(mission => mission.category === activeCategory);

    const handleMissionSelect = (mission) => {
        if (mission.longitude && mission.latitude) {
            navigate("/gocapiba/desafios", { state: { mission } });
        }
    };

    return (
        <div className="weekly-missions">
            <h2>Missões do Carnaval</h2>
            <p className="missions-description">Complete estas missões para ganhar moedas capibas.</p>

            {filteredMissions.length === 0 ? (
                <div className="no-missions">
                    <p>Não há missões disponíveis nesta categoria.</p>
                </div>
            ) : (
                <div className="missions-list">
                    {filteredMissions.map((mission) => (
                        <div
                            key={mission.id}
                            className={`mission-card ${mission.completed ? "completed" : ""} ${mission.category}`}
                            onClick={() => handleMissionSelect(mission)}
                        >
                            <div className="mission-info">
                                <h3>{mission.title}</h3>
                                <p>{mission.description}</p>
                                {!mission.completed && (
                                    <div className="progress-container">
                                        <div className="progress-bar">
                                            <div
                                                className="progress-fill"
                                                style={{ width: `${(mission.progress.current / mission.progress.total) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="progress-text">
                                            {mission.progress.current}/{mission.progress.total}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="mission-reward">
                                <span className="reward-amount">{mission.reward}</span>
                                <span className="reward-label">capibas</span>
                                {mission.completed && <div className="completed-badge">Concluída</div>}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WeeklyMissions; 