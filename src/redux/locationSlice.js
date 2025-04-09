import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
    name: 'location',
    initialState: {
        currentPosition: null, // [latitude, longitude]
    },
    reducers: {
        setCurrentPosition: (state, action) => {
            state.currentPosition = action.payload;
        },
    },
});

export const { setCurrentPosition } = locationSlice.actions;
export default locationSlice.reducer;