import React from "react";
import { useNavigate } from "react-router-dom";
import "./DailyMissions.css";

function DailyMissions({ activeCategory = "all" }) {
    const navigate = useNavigate();

    // Dados de exemplo para missões diárias
    const allMissions = [
        // Missões de turismo
        {
            id: 1,
            title: "Visitar o Marco Zero",
            description: "Visite o Marco Zero no Recife Antigo",
            reward: 6,
            completed: false,
            category: "tourism",
            longitude: "-8.062921704745952",
            latitude: "-34.87125494918955"
        },
        {
            id: 2,
            title: "Conhecer o Paço do Frevo",
            description: "Visite o museu do Paço do Frevo",
            reward: 5,
            completed: false,
            category: "tourism",
            longitude: "-8.061240354998578",
            latitude: "-34.87151913384772"
        },
        {
            id: 3,
            title: "Conhecer a Rua do Bom Jesus",
            description: "Conheça a famosa rua do Recife Antigo",
            reward: 4,
            completed: true,
            category: "tourism",
            longitude: "-8.06243181845869",
            latitude: "-34.87152470316405"
        },
        {
            id: 4,
            title: "Passeio pelo Parque Santana",
            description: "Participe das atividades no Parque Santana.",
            reward: 5,
            completed: false,
            category: "tourism",
            longitude: "-8.0345",
            latitude: "-34.9156"
        },
        // Missões blocos
        {
            id: 5,
            title: "Arrastão do Frevo",
            description: "Participe do Arrastão do Frevo no Paço do Frevo: Praça do Arsenal da Marinha, s/n, Bairro do Recife – Recife, Segunda (3), a partir das 15h",
            reward: 10,
            completed: false,
            category: "blocos",
            longitude: "-8.061240354998578",
            latitude: "-34.87151913384772"
        },

        {
            id: 6,
            title: "Bloco Agarra Agarra",
            description: "Participe do Bloco Agarra Agarra: Mercado Público de Casa Amarela: Rua Padre Lemos, 94, Casa Amarela – Recife, Segunda (3), com concentração às 18h",
            reward: 12,
            completed: false,
            category: "blocos",
            longitude: "-8.025888",
            latitude: "-34.917471"
        },
        {
            id: 7,
            title: "Bloco da Ressaca",
            description: "Participe do Bloco da Ressaca:  Avenida Vasco da Gama, no Vasco da Gama – Recife, Segunda (3), com concentração às 13h",
            reward: 10,
            completed: false,
            category: "blocos",
            longitude: "-8.004550",
            latitude: "-34.922308"
        },
        {
            id: 8,
            title: "Bloco Bolinha de Sabão",
            description: "Participe do Bloco Bolinha de Sabão: R. Eng. José Brandão Cavalcante, Imbiribeira, Recife - Segunda (3), com concentração às 14h.",
            reward: 10,
            completed: false,
            category: "blocos",
            longitude: "-8.093727",
            latitude: "-34.916545"
        },
        {
            id: 9,
            title: "QG do Frevo",
            description: "Visite o QG do Frevo: Santo Antonio, Recife - Segunda (3), com concentração a às 17h.",
            reward: 10,
            completed: false,
            category: "blocos",
            longitude: "-8.063601",
            latitude: "-34.877622"
        },
        // Missões shows
        {
            id: 10,
            title: "BaianaSystem",
            description: "Vá ao show de Baiana ystem: 23h15 no Marco Zero",
            reward: 8,
            completed: false,
            category: "shows",
            longitude: "-8.062921704745952",
            latitude: "-34.87125494918955"
        },
        {
            id: 11,
            title: "Nação Zumbi",
            description: "Vá ao show de Nação Zumbi: 21h30 no Marco Zero",
            reward: 8,
            completed: false,
            category: "shows",
            longitude: "-8.062921704745952",
            latitude: "-34.87125494918955"
        },
    ];

    // Filtrar missões com base na categoria selecionada
    const filteredMissions = activeCategory === "all"
        ? allMissions
        : allMissions.filter(mission => mission.category === activeCategory);

        const handleMissionSelect = (mission) => {
            if (mission.longitude && mission.latitude) {
                navigate("/desafios", { state: { mission } });
            }
        };
        

    return (
        <div className="daily-missions">
            <h2>Missões Diárias</h2>
            <p className="missions-description">Complete estas missões para ganhar moedas capibas diariamente.</p>

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

export default DailyMissions; 