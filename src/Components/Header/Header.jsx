import React from "react";
import { useSelector } from "react-redux";
import "./Header.css";
import defaultPhoto from "../../assets/avatar1.jpg";

function Header() {
    const user = useSelector((state) => state.user);
    const image = localStorage.getItem("profilePic") || user.profilePic;
    const capibas = parseInt(localStorage.getItem('capibas'), 10) || user.capiba;

    return (
        <div className="header">
            <div className="profile-content">
                <img 
                    src={image || defaultPhoto} 
                    alt="foto de perfil" 
                />
                <div className="info">
                    <h3>{user.name}</h3>
                    <span>Nível Passista</span>
                </div>
            </div>
            <div className="cash">
                <h3>Saldo capiba</h3>
                <span>C${capibas}</span> 
            </div>
        </div>
    );
}

export default Header;
