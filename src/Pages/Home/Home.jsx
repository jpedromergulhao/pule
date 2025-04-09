import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home.css";
import Login from "../../Components/Login/Login";
import logo1 from "../../assets/home-icon.png";
import Register from "../../Components/Register/Register";
import gif from '../../assets/frevo.gif';

export const LogoContext = createContext();

function Home() {
    const logoDiv = useRef();
    const { showRegister } = useContext(AuthContext);
    const [showSplash, setShowSplash] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });

        const alreadyReloaded = sessionStorage.getItem('alreadyReloaded');

        if (!alreadyReloaded) { // recarrega a página
            sessionStorage.setItem('alreadyReloaded', 'true');
            window.location.reload();
        }

        const fadeTimer = setTimeout(() => {
            setFadeOut(true);
        }, 2000);

        const removeTimer = setTimeout(() => {
            setShowSplash(false);
        }, 2500);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    if (showSplash) {
        return (
            <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
                <img src={gif} alt="Animação de frevo" />
            </div>
        );
    }

    return (
        <div className="home">
            <div className="content">
                <div className="logo" ref={logoDiv}>
                    <img src={logo1} alt="Logo Pule!" data-aos="zoom-in" />
                    <h1 data-aos="fade-right">Pule!</h1>
                </div>

                <LogoContext.Provider value={logoDiv}>
                    {!showRegister ? <Login /> : <Register />}
                </LogoContext.Provider>
            </div>
        </div>
    );
}

export default Home;
