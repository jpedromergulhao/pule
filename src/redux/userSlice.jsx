import { createSlice } from "@reduxjs/toolkit";

// Carrega os dados do localStorage ou usa o estado inicial padrão
const loadStateFromLocalStorage = () => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : {
        name: "Usuário",
        surname: "",
        email: "email",
        profilePic: null,
        capiba: 0,
        id: 0,
        availableRewards: []
    };
};

const initialState = loadStateFromLocalStorage();

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            Object.assign(state, action.payload);
            localStorage.setItem("user", JSON.stringify(state)); // Salva no localStorage
        },
        updateCapibas: (state, action) => {
            state.capiba -= action.payload;
            localStorage.setItem("user", JSON.stringify(state)); // Atualiza no localStorage
        },
        redeemReward: (state, action) => {
            state.capiba -= action.payload.price;
            state.availableRewards = state.availableRewards.filter(reward => reward.id !== action.payload.id);
            localStorage.setItem("user", JSON.stringify(state)); // Atualiza no localStorage
        },
        setAvailableRewards: (state, action) => {
            state.availableRewards = action.payload;
            localStorage.setItem("user", JSON.stringify(state)); // Atualiza no localStorage
        },
    },
});

export const { setUser, updateCapibas, redeemReward, setAvailableRewards } = userSlice.actions;
export default userSlice.reducer;
