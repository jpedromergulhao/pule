import React from "react";
import "./GoCapiba.css";
import Header from "../../Components/Header/Header";
import Map from "../../Components/Map/Map";

function GoCapiba() {
    return (
        <div className="gocapiba-container">
            <Header />
            <Map />
        </div>
    );
}

export default GoCapiba;