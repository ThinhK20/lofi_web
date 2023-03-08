import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    videos: null,
    progressPercent: 0,
};
const videoSlice = createSlice({
    name: "videoStorage",
    initialState: initialValue,
    reducers: {
        updateVideoStorage(state, action) {
            if (state.videos && state.videos[action.payload.topic]) {
                state.videos[action.payload.topic] = {
                    ...state.videos[action.payload.topic],
                    [action.payload.data.caption]: URL.createObjectURL(action.payload.data.blob),
                };
            } else {
                state.videos = {
                    ...state.videos,
                    [action.payload.topic]: {
                        [action.payload.data.caption]: URL.createObjectURL(action.payload.data.blob),
                    },
                };
            }
        },
        updateProgressPercent(state, action) {
            state.progressPercent = action.payload;
        },
    },
});

const { actions } = videoSlice;
export const { updateVideoStorage, updateProgressPercent } = actions;

export default videoSlice.reducer;
