import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Confetti from "react-confetti"; // Biblioteca para confetes
import { useWindowSize } from "react-use";
import Map from "../../Components/Map/Map";
import "./Challenges.css";

function Challenges() {
    const location = useLocation();
    const navigate = useNavigate();
    const [mission, setMission] = useState(null);
    const [destination, setDestination] = useState(null);
    const [routeInfo, setRouteInfo] = useState(null);
    const [showConfetti, setShowConfetti] = useState(true);
    const { width, height } = useWindowSize();

    useEffect(() => {
        if (location.state && location.state.mission) {
            setMission(location.state.mission);
            if (location.state.mission.longitude && location.state.mission.latitude) {
                setDestination([
                    parseFloat(location.state.mission.latitude),
                    parseFloat(location.state.mission.longitude),
                ]);
            }
        } else {
            navigate("/missoes");
        }
    }, [location, navigate]);

    const handleRouteCalculated = (info) => {
        setRouteInfo(info);
    };

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });

        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="challenges-container">
            {showConfetti && (
                <Confetti
                    width={width}
                    height={height}
                    style={{ position: "fixed", top: 0, left: 0, zIndex: 9999 }}
                />
            )}
            {/* Renderiza confetes */}

            <div className="challenges-header" data-aos="fade-down">
                <h1>{mission?.title}</h1>
                <p>{mission?.description}</p>
                {routeInfo && (
                    <div className="route-info">
                        <div className="info-item">
                            <span className="label">Distância:</span>
                            <span className="value">
                                {typeof routeInfo.distance === "number"
                                    ? routeInfo.distance.toFixed(1)
                                    : routeInfo.distance}{" "}
                                km
                            </span>
                        </div>
                        <div className="info-item">
                            <span className="label">Tempo estimado de carro:</span>
                            <span className="value">{routeInfo.duration} minutos</span>
                        </div>
                    </div>
                )}
            </div>
            <div className="challenges-content">
                <Map destination={destination} onRouteCalculated={handleRouteCalculated} />
            </div>
        </div>
    );
}

export default Challenges;
