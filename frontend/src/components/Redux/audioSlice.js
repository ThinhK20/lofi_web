import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    audioSongs: [],
    audioNoises: [],
};

const audioSlice = createSlice({
    name: "audioStorage",
    initialState: initialValue,
    reducers: {
        updateSongStorage(state, action) {
            state.audioSongs = action.payload;
        },
        updateNoiseStorage(state, action) {
            state.audioNoises = action.payload;
        },
    },
});

const { actions } = audioSlice;
export const { updateNoiseStorage, updateSongStorage } = actions;
export default audioSlice.reducer;
