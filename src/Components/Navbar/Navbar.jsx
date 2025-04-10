import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setCurrentPosition } from '../../redux/locationSlice';
import { AuthContext } from "../../context/AuthContext";
import './Navbar.css';
import logoutIcon from '../../assets/logout.png';
import pinIcon from '../../assets/pin.png';
import mapIcon from '../../assets/map.png';
import maskIcon from '../../assets/mask.png';
import userIcon from '../../assets/user.png';
import marketIcon from '../../assets/market.png';

function Navbar() {

    const dispatch = useDispatch();
    const { setShowRegister } = useContext(AuthContext);

    const getUserLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coords = [position.coords.latitude, position.coords.longitude];
                    dispatch(setCurrentPosition(coords));
                },
                (error) => {
                    console.warn('Erro ao obter localização:', error.message);
                    if (error.code === error.PERMISSION_DENIED) {
                        alert('🚫 Localização negada! Vá nas configurações do navegador e ative a permissão.');
                    } else {
                        alert('⚠️ Ops! Não conseguimos pegar sua localização. Tente novamente.');
                    }
                }
            );
        } else {
            alert('❌ Seu navegador não suporta geolocalização.');
        }
    };

    const handleHomeReturn = () => {
        sessionStorage.clear();
        setShowRegister(prev => {
            if (prev) return false;
            return prev;
        });
    }

    return (
        <nav>
            <Link to="/" aria-label="Logout" onClick={handleHomeReturn}>
                <img className="icons" src={logoutIcon} alt="home" />
            </Link>
            <button className="location" aria-label="Sua localização" onClick={getUserLocation}>
                <img className="icons" src={pinIcon} alt="localização" />
            </button>
            <Link to="/mapa" aria-label="Ir para mapa">
                <img className="icons" src={mapIcon} alt="mapa" />
            </Link>
            <Link to="/missoes" aria-label="Ir para os desafios">
                <img className="icons" src={maskIcon} alt="desafios" />
            </Link>
            <Link to="/loja" aria-label="Ir para a loja">
                <img className="icons" src={marketIcon} alt="loja" />
            </Link>
            <Link to="/perfil" aria-label="Ir para o perfil">
                <img className="icons" src={userIcon} alt="perfil" />
            </Link>
        </nav>
    );
}

export default Navbar;
