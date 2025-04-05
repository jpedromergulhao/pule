import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import locationReducer from "./locationSlice"; 

// Recupera o estado salvo no localStorage
const loadState = () => {
    try {
        const serializedState = localStorage.getItem("userState");
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (err) {
        return undefined;
    }
};

// Salva apenas o estado do usuário no localStorage
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("userState", serializedState);
    } catch (err) {
        console.error("Erro ao salvar estado:", err);
    }
};

const store = configureStore({
    reducer: {
        user: userReducer,
        location: locationReducer, // adiciona o reducer de localização
    },
    preloadedState: {
        user: loadState() || {}, // carrega só o estado salvo do user
    },
});

// Assina mudanças e salva apenas o estado do user
store.subscribe(() => {
    saveState(store.getState().user);
});

export default store;
