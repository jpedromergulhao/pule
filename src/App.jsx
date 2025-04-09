import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import GoCapiba from "./Pages/GoCapiba/GoCapiba";
import Missions from "./Pages/Missions/Missions";
import Rewards from "./Pages/Rewards/Rewards";
import Profile from "./Pages/Profile/Profile";
import Challenges from "./Pages/Challenges/Challenges";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";

// Verifica se o usuário completou o cadastro
const isUserRegistered = () => {
  return localStorage.getItem("userRegistered") === "true";
};

// Componente para proteger rotas
function ProtectedRoute({ element }) {
  return isUserRegistered() ? element : <Navigate to="/" replace />;
}

function MainLayout() {
  return (
    <>
      <Routes>
        <Route path="/mapa" element={<ProtectedRoute element={<GoCapiba />} />} />
        <Route path="/missoes" element={<ProtectedRoute element={<Missions />} />} />
        <Route path="/loja" element={<ProtectedRoute element={<Rewards />} />} />
        <Route path="/perfil" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/desafios" element={<ProtectedRoute element={<Challenges />} />} />
      </Routes>
      <Navbar />
    </>
  );
}

function App() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isDesktop) {
    return (
      <div className="desktop-warning">
        <h2>📱 Este projeto foi desenvolvido para dispositivos mobile!</h2>
        <p>📲 Para a melhor experiência, acesse em um smartphone.</p>
        <p>🖥️💡 Caso esteja no PC, pressione <strong>F12 (Windows)</strong> ou <strong>F11 (Mac)</strong> para abrir as ferramentas de desenvolvimento e ajustar a largura da tela e poder visualizar o app corretamente.</p>
      </div>
    );
  }

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/politica" element={<PrivacyPolicy />} />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
