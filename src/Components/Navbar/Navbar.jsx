import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setCurrentPosition } from '../../redux/locationSlice';
import './Navbar.css';
import homeIcon from '../../assets/home.png';
import pinIcon from '../../assets/pin.png';
import mapIcon from '../../assets/map.png';
import maskIcon from '../../assets/mask.png';
import userIcon from '../../assets/user.png';
import marketIcon from '../../assets/market.png';

function Navbar() {

    const dispatch = useDispatch();

    const getUserLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coords = [position.coords.latitude, position.coords.longitude];
                    dispatch(setCurrentPosition(coords));
                    alert('📍 Localização ativada com sucesso!');
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

    return (
        <nav>
            <Link to="/">
                <img className="icons" src={homeIcon} alt="home" />
            </Link>
            <button className="location" onClick={getUserLocation}>
                <img className="icons" src={pinIcon} alt="localização" />
            </button>
            <Link to="/mapa">
                <img className="icons" src={mapIcon} alt="mapa" />
            </Link>
            <Link to="/missoes">
                <img className="icons" src={maskIcon} alt="desafios" />
            </Link>
            <Link to="/loja">
                <img className="icons" src={marketIcon} alt="loja" />
            </Link>
            <Link to="/perfil">
                <img className="icons" src={userIcon} alt="perfil" />
            </Link>
        </nav>
    );
}

export default Navbar;
