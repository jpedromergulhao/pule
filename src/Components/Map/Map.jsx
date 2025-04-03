import React, { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './Map.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function MapUpdater({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
}

function Map({ destination, onRouteCalculated }) {
    const [currentPosition, setCurrentPosition] = useState(null);
    const [route, setRoute] = useState(null);

    const convertToLeafletCoords = (googleCoords) => {
        if (!googleCoords || !Array.isArray(googleCoords) || googleCoords.length !== 2) {
            console.error('Coordenadas inválidas:', googleCoords);
            return null;
        }
        return [googleCoords[1], googleCoords[0]]; // [lng, lat] -> [lat, lng]
    };

    const calculateRoute = useCallback(async (start, end) => {
        if (!start || !end) return;

        try {
            const response = await fetch(
                `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (data.routes && data.routes[0]) {
                const routeData = data.routes[0];
                const routeCoords = routeData.geometry.coordinates.map(coord => [coord[1], coord[0]]);
                setRoute(routeCoords);

                if (onRouteCalculated) {
                    onRouteCalculated({
                        distance: (routeData.distance / 1000).toFixed(1),
                        duration: Math.round(routeData.duration / 60)
                    });
                }
            }
        } catch (error) {
            console.error("Error calculating route:", error);
            setRoute([start, end]);

            const R = 6371;
            const lat1 = start[0] * Math.PI / 180;
            const lat2 = end[0] * Math.PI / 180;
            const deltaLat = (end[0] - start[0]) * Math.PI / 180;
            const deltaLon = (end[1] - start[1]) * Math.PI / 180;

            const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
                    Math.cos(lat1) * Math.cos(lat2) *
                    Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            const distance = R * c;

            if (onRouteCalculated) {
                onRouteCalculated({
                    distance: distance.toFixed(1),
                    duration: Math.round(distance * 3)
                });
            }
        }
    }, [onRouteCalculated]);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = [position.coords.latitude, position.coords.longitude];
                    setCurrentPosition(pos);
                },
                (error) => {
                    console.error("Erro ao obter localização:", error);
                    alert("Você caiu na localização onde o hackathon foi realizado. Por favor habilite a localização ou apenas continue com a localização atual.");
                    setCurrentPosition([-8.054257, -34.886898]); 
                }
            );
        } else {
            alert("Houve algum erro em pegar a sua localização e você caiu na localização onde o hackathon foi realizado. Tente recarregar a página e habilitar a localização ou apenas continue com a localização atual.")
            setCurrentPosition([-8.054257, -34.886898]);
        }
    }, []);

    useEffect(() => {
        if (currentPosition && destination) {
            const leafletDestination = convertToLeafletCoords(destination);
            if (leafletDestination) {
                calculateRoute(currentPosition, leafletDestination);
            }
        }
    }, [currentPosition, destination, calculateRoute]);

    if (!currentPosition) {
        return <div>Carregando mapa...</div>;
    }

    return (
        <div className="map-container">
            <MapContainer
                center={currentPosition}
                zoom={16}
                style={{ height: "100%", width: "100%" }}
            >
                <MapUpdater center={currentPosition} zoom={16} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={currentPosition}>
                    <Popup>Você está aqui</Popup>
                </Marker>
                {destination && (
                    <>
                        <Marker position={convertToLeafletCoords(destination)}>
                            <Popup>Destino</Popup>
                        </Marker>
                        {route && (
                            <Polyline positions={route} color="#4CAF50" weight={3} opacity={0.7} />
                        )}
                    </>
                )}
            </MapContainer>
        </div>
    );
}

export default Map;
