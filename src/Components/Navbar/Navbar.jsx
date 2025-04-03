import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import homeIcon from '../../assets/home.png';
import mapIcon from '../../assets/map.png';
import maskIcon from '../../assets/mask.png';
import userIcon from '../../assets/user.png';
import marketIcon from '../../assets/market.png';

function Navbar() {
    return (
        <nav>
            <Link to="/">
                <img className="icons" src={homeIcon} alt="home" />
            </Link>
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
    )
}

export default Navbar;
