import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    dateState: new Date(),
    activeDateWidget: false,
    theme: 'light',
    rain: false,
    audioVolume: 1,
    mutedAudio: false,
    currentSongId: 0
}

const generalSlice = createSlice({
    name: "general",
    initialState: initialValue,
    reducers: {
        updateDate(state) {
            state.dateState = new Date();
        },
        setActiveDateWidget(state, action) {
            state.activeDateWidget = action.payload;
        },
        setTheme(state, action) {
            state.theme = action.payload;
        },
        setRain(state, action) {
            state.rain = action.payload;
        },
        setVolume(state, action) {
            state.audioVolume = action.payload;
        }, 
        setMutedAudio(state, action) {
            state.mutedAudio = action.payload
        },
        setCurrentSongId(state, action) {
            state.currentSongId = action.payload
        }
    },
});

const { actions } = generalSlice;
export const { updateDate, setActiveDateWidget, setTheme, setRain, setVolume, setMutedAudio, setCurrentSongId } = actions;
export default generalSlice.reducer;
