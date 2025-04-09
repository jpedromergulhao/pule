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
            description: "Vá ao show de BaianaSystem: 23h15 no Marco Zero",
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
        {
            id: 12,
            title: "Nego El e Coco Arranca Toco",
            description: "Vá ao show de Nego El e Coco Arranca Toco: 18h00 no Alto José do Pinho",
            reward: 15,
            completed: false,
            category: "shows",
            longitude: "-8.023078",
            latitude: "-34.907930"
        },
        {
            id: 13,
            title: "Luiz Lins",
            description: "Vá ao show de Luiz Lins: 22h20 no Alto José do Pinho",
            reward: 25,
            completed: false,
            category: "shows",
            longitude: "-8.023078",
            latitude: "-34.907930"
        },
        {
            id: 14,
            title: "Maciel Salu com participação de Juliana Linhares",
            description: "Vá ao show de Maciel Salu com participação de Juliana Linhares: 22h00 no Arsenal",
            reward: 10,
            completed: false,
            category: "shows",
            longitude: "-8.061036",
            latitude: "-34.871297"
        },
        {
            id: 15,
            title: "Natália Rosa",
            description: "Vá ao show de Natália Rosa: 20h00 em Brasília Teimosa",
            reward: 15,
            completed: false,
            category: "shows",
            longitude: "-8.083481",
            latitude: "-34.880349"
        },
        {
            id: 16,
            title: "Patusco",
            description: "Vá ao show de Patusco: 23h40 em Brasília Teimosa",
            reward: 30,
            completed: false,
            category: "shows",
            longitude: "-8.083481",
            latitude: "-34.880349"
        },
        {
            id: 17,
            title: "Silvério Pessoa",
            description: "Vá ao show de Silvério Pessoa: 21h10 na Bomba do Hemetério",
            reward: 32,
            completed: false,
            category: "shows",
            longitude: "-8.021532",
            latitude: "-34.900856"
        },
        {
            id: 18,
            title: "Milton Raulino & O Chorinho no Mangue",
            description: "Vá ao show de Milton Raulino & O Chorinho no Mangue: 19h00 em Casa Amarela",
            reward: 22,
            completed: false,
            category: "shows",
            longitude: "-8.026792",
            latitude: "-34.917759"
        },
        {
            id: 19,
            title: "Neris Rodrigues e o Trombonando",
            description: "Vá ao show de Neris Rodrigues e o Trombonando: 17h30 nas Graças",
            reward: 15,
            completed: false,
            category: "shows",
            longitude: "-8.047620",
            latitude: "-34.899900"
        },
        {
            id: 20,
            title: "Helton Lima",
            description: "Vá ao show de Helton Lima: 20h00 no Ibura",
            reward: 30,
            completed: false,
            category: "shows",
            longitude: "-8.110557",
            latitude: "-34.936993"
        },
        {
            id: 21,
            title: "Boca Miúda",
            description: "Vá ao show de Boca Miúda: 19h00 em Jardin São Paulo",
            reward: 26,
            completed: false,
            category: "shows",
            longitude: "-8.079947",
            latitude: "-34.942802"
        },
        {
            id: 22,
            title: "Lenine",
            description: "Vá ao show de Lenine: 22h20 na Lagoa do Araçá",
            reward: 27,
            completed: false,
            category: "shows",
            longitude: "-8.094411",
            latitude: "-34.915025"
        },
        {
            id: 23,
            title: "Junior Soull",
            description: "Vá ao show de Junior Soull: 19h00 em Linha do Tiro",
            reward: 34,
            completed: false,
            category: "shows",
            longitude: "-8.008578",
            latitude: "-34.904666"
        },
        {
            id: 24,
            title: "Legião Urbana Recife Cover",
            description: "Vá ao show de Legião Urbana Recife Cover: 19h00 em Poço da Panela",
            reward: 24,
            completed: false,
            category: "shows",
            longitude: "-8.035329",
            latitude: "-34.924474"
        },
        {
            id: 25,
            title: "Siba e a Fuloresta",
            description: "Vá ao show de Siba e a Fuloresta: 20h00 na Várzea",
            reward: 28,
            completed: false,
            category: "shows",
            longitude: "-8.048400",
            latitude: "-34.959090"
        },
        {
            id: 26,
            title: "Liv Moraes",
            description: "Vá ao show de Liv Moraes: 20h00 no Cordeiro",
            reward: 20,
            completed: false,
            category: "shows",
            longitude: "-8.047936",
            latitude: "-34.925821"
        }
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