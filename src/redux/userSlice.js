import { createSlice } from "@reduxjs/toolkit";

// Carrega os dados do localStorage ou usa o estado inicial padrão
const loadStateFromLocalStorage = () => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : {
        name: "Usuário",
        surname: "",
        email: "email",
        password: "",
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
            localStorage.setItem("user", JSON.stringify(state));
        },
        redeemReward: (state, action) => {
            const reward = action.payload;
            if (state.capiba >= reward.price) {
                state.capiba -= reward.price;
                localStorage.setItem("user", JSON.stringify(state)); 
            }
        },
        setAvailableRewards: (state, action) => {
            state.availableRewards = action.payload;
            localStorage.setItem("user", JSON.stringify(state));
        },
        logoutUser: (state) => {
            const defaultState = {
                name: "Usuário",
                surname: "",
                email: "email",
                password: "",
                profilePic: null,
                capiba: 0,
                id: 0,
                availableRewards: []
            };
            Object.assign(state, defaultState);
            localStorage.removeItem("user");
        },
        setProfilePic: (state, action) => {
            state.profilePic = action.payload;
            localStorage.setItem("user", JSON.stringify(state));
        }
    },
});

// Exportação das ações
export const {
    setUser,
    redeemReward,
    setAvailableRewards,
    logoutUser,
    setProfilePic
} = userSlice.actions;

export default userSlice.reducer;
