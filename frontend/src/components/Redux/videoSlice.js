import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    videos: null,
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
    },
});

const { actions } = videoSlice;
export const { updateVideoStorage } = actions;

export default videoSlice.reducer;
