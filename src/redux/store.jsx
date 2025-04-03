import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

// Recupera o estado salvo no localStorage
const loadState = () => {
    try {
        const serializedState = localStorage.getItem("userState");
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (err) {
        return undefined;
    }
};

// Salva o estado no localStorage
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
    },
    preloadedState: {
        user: loadState() || {}, // Carrega estado salvo ou usa o estado inicial
    },
});

store.subscribe(() => {
    saveState(store.getState().user);
});

export default store;
