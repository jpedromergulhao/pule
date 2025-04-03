import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { redeemReward, setAvailableRewards } from "../../redux/userSlice";
import "./Rewards.css";

function Rewards() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [showRedeemModal, setShowRedeemModal] = useState(false);
    const [selectedReward, setSelectedReward] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const initialRewards = useMemo(() => [
        { id: 1, title: "Desconto de R$15 na Uber", description: "Válido para sua próxima corrida em Recife", price: 50, category: "transport", provider: "Uber", logo: "🚗", expiresIn: "30 dias", discount: "R$15,00" },
        { id: 2, title: "Desconto de R$10 na 99", description: "Válido para corridas em Recife e Região Metropolitana", price: 40, category: "transport", provider: "99", logo: "🚕", expiresIn: "30 dias", discount: "R$10,00" },
        { id: 3, title: "Corrida Gratuita até R$20", description: "Válido apenas para novos usuários da Uber", price: 80, category: "transport", provider: "Uber", logo: "🚗", expiresIn: "15 dias", discount: "R$20,00" },
        { id: 4, title: "15% OFF no Mercado Bom Gosto", description: "Desconto em todo o supermercado", price: 30, category: "food", provider: "Mercado Bom Gosto", logo: "🛒", expiresIn: "45 dias", discount: "15%" },
        { id: 5, title: "20% OFF no McDonald's Recife", description: "Válido em todas as unidades de Recife", price: 35, category: "food", provider: "McDonald's", logo: "🍔", expiresIn: "30 dias", discount: "20%" },
        { id: 6, title: "10% OFF na Pizzaria Atlântico", description: "Pizzaria tradicional do Recife Antigo", price: 25, category: "food", provider: "Pizzaria Atlântico", logo: "🍕", expiresIn: "30 dias", discount: "10%" },
        { id: 7, title: "Entrada gratuita no Paço do Frevo", description: "Museu da cultura do frevo em Recife", price: 45, category: "entertainment", provider: "Paço do Frevo", logo: "🎭", expiresIn: "60 dias", discount: "100%" },
        { id: 8, title: "50% OFF no Cinema São Luiz", description: "Cinema tradicional no centro do Recife", price: 40, category: "entertainment", provider: "Cinema São Luiz", logo: "🎬", expiresIn: "30 dias", discount: "50%" },
        { id: 9, title: "15% OFF na Livraria Cultura", description: "Desconto válido para livros e papelaria", price: 35, category: "shopping", provider: "Livraria Cultura", logo: "📚", expiresIn: "45 dias", discount: "15%" },
        { id: 10, title: "20% OFF no Shopping Recife", description: "Válido em lojas selecionadas", price: 55, category: "shopping", provider: "Shopping Recife", logo: "🛍️", expiresIn: "30 dias", discount: "20%" }
    ], []);

    useEffect(() => {
        if (user.availableRewards.length === 0) {
            dispatch(setAvailableRewards(initialRewards)); // Define os prêmios disponíveis no Redux na primeira vez
        }
    }, [dispatch, user.availableRewards.length, initialRewards]);

    // Filtrar recompensas por categoria
    const getFilteredRewards = () => {
        if (activeCategory === "all") return user.availableRewards;
        return user.availableRewards.filter(reward => reward.category === activeCategory);
    };

    // Abrir modal de resgate
    const handleOpenRedeemModal = (reward) => {
        setSelectedReward(reward);
        setShowRedeemModal(true);
    };

    // Fechar modal de resgate
    const handleCloseRedeemModal = () => {
        setShowRedeemModal(false);
        setSelectedReward(null);
    };

    // Função para simular o resgate de uma recompensa
    const handleRedeemReward = () => {
        if (!selectedReward) return;
    
        if (user.capiba >= selectedReward.price) {
            dispatch(redeemReward(selectedReward));
            alert(`🎉 Parabéns! Você resgatou "${selectedReward.title}"! O código será enviado para seu e-mail. 📩`);
        } else {
            alert("⚠️ Você não tem Capibas suficientes para resgatar esta recompensa. 💰❌");
        }
    
        handleCloseRedeemModal();
    };
    

    return (
        <div className="rewards-container">
            <div className="rewards-header">
                <div className="header-content">
                    <h1>Recompensas</h1>
                    <div className="user-coins">
                        <span className="coin-icon">💰</span>
                        <span className="coin-amount">{user.capiba}</span>
                        <span>capibas</span>
                    </div>
                </div>
            </div>

            <div className="category-filter">
                <button
                    className={`category-button ${activeCategory === "all" ? "active" : ""}`}
                    onClick={() => setActiveCategory("all")}
                >
                    <span className="category-icon">🏆</span> Todas
                </button>
                <button
                    className={`category-button transport ${activeCategory === "transport" ? "active" : ""}`}
                    onClick={() => setActiveCategory("transport")}
                >
                    <span className="category-icon">🚗</span> Transporte
                </button>
                <button
                    className={`category-button food ${activeCategory === "food" ? "active" : ""}`}
                    onClick={() => setActiveCategory("food")}
                >
                    <span className="category-icon">🍔</span> Alimentação
                </button>
                <button
                    className={`category-button entertainment ${activeCategory === "entertainment" ? "active" : ""}`}
                    onClick={() => setActiveCategory("entertainment")}
                >
                    <span className="category-icon">🎭</span> Entretenimento
                </button>
                <button
                    className={`category-button shopping ${activeCategory === "shopping" ? "active" : ""}`}
                    onClick={() => setActiveCategory("shopping")}
                >
                    <span className="category-icon">🛍️</span> Compras
                </button>
            </div>

            <div className="rewards-content">
                <div className="rewards-description">
                    <p>Troque suas moedas capibas por descontos e vantagens em Recife!</p>
                </div>

                <div className="rewards-grid">
                    {getFilteredRewards().map(reward => (
                        <div key={reward.id} className={`reward-card ${reward.category}`}>
                            <div className="reward-logo">
                                <span>{reward.logo}</span>
                            </div>
                            <div className="reward-provider">{reward.provider}</div>
                            <div className="reward-title">{reward.title}</div>
                            <div className="reward-description">{reward.description}</div>
                            <div className="reward-expiry">Expira em: {reward.expiresIn}</div>
                            <div className="reward-price">
                                <span className="price-icon">💰</span>
                                <span className="price-amount">{reward.price}</span>
                            </div>
                            <button
                                className="redeem-button"
                                onClick={() => handleOpenRedeemModal(reward)}
                            >
                                Resgatar
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal de resgate */}
            {showRedeemModal && selectedReward && (
                <div className="redeem-modal-overlay">
                    <div className="redeem-modal">
                        <div className="modal-header">
                            <h2>Confirmar Resgate</h2>
                            <button className="close-button" onClick={handleCloseRedeemModal}>×</button>
                        </div>
                        <div className="modal-content">
                            <div className="reward-logo large">
                                <span>{selectedReward.logo}</span>
                            </div>
                            <h3>{selectedReward.title}</h3>
                            <p>{selectedReward.description}</p>
                            <div className="reward-detail">
                                <span className="detail-label">Fornecedor:</span>
                                <span className="detail-value">{selectedReward.provider}</span>
                            </div>
                            <div className="reward-detail">
                                <span className="detail-label">Desconto:</span>
                                <span className="detail-value">{selectedReward.discount}</span>
                            </div>
                            <div className="reward-detail">
                                <span className="detail-label">Validade:</span>
                                <span className="detail-value">{selectedReward.expiresIn}</span>
                            </div>
                            <div className="confirmation-message">
                                <p>Você vai trocar <strong>{selectedReward.price} capibas</strong> por esta recompensa. Deseja continuar?</p>
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button className="cancel-button" onClick={handleCloseRedeemModal}>Cancelar</button>
                            <button className="confirm-button" onClick={handleRedeemReward}>Confirmar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Rewards; 