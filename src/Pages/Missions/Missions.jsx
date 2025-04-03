import React, { useState } from "react";
import "./Missions.css";
import DailyMissions from "./DailyMissions/DailyMissions";
import WeeklyMissions from "./WeeklyMissions/WeeklyMissions";

function Missions() {
    const [activeTab, setActiveTab] = useState("daily");
    const [activeCategory, setActiveCategory] = useState("all");

    const renderMissions = () => {
        switch (activeTab) {
            case "daily":
                return <DailyMissions activeCategory={activeCategory} />;
            case "weekly":
                return <WeeklyMissions activeCategory={activeCategory} />;
            default:
                return <DailyMissions activeCategory={activeCategory} />;
        }
    };

    return (
        <div className="missions-container">
            <div className="missions-header">
                <h1>Missões</h1>
            </div>

            <div className="missions-tabs">
                <button
                    className={`tab-button ${activeTab === "daily" ? "active" : ""}`}
                    onClick={() => setActiveTab("daily")}
                >
                    Diárias
                </button>
                <button
                    className={`tab-button ${activeTab === "weekly" ? "active" : ""}`}
                    onClick={() => setActiveTab("weekly")}
                >
                    Carnaval
                </button>
            </div>

            <div className="category-filter">
                <button
                    className={`category-button ${activeCategory === "all" ? "active" : ""}`}
                    onClick={() => setActiveCategory("all")}
                >
                    Todas
                </button>
                <button
                    className={`category-button ${activeCategory === "tourism" ? "active" : ""}`}
                    onClick={() => setActiveCategory("tourism")}
                >
                    Turismo
                </button>
                <button
                    className={`category-button ${activeCategory === "blocos" ? "active" : ""}`}
                    onClick={() => setActiveCategory("blocos")}
                >
                    Blocos
                </button>
                <button
                    className={`category-button ${activeCategory === "shows" ? "active" : ""}`}
                    onClick={() => setActiveCategory("shows")}
                >
                    Shows
                </button>
            </div>

            <div className="missions-content">
                {renderMissions()}
            </div>
        </div>
    );
}

export default Missions; 