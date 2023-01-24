import { configureStore } from "@reduxjs/toolkit";
import audioSlice from "./audioSlice";
import generalSlice from "./generalSlice";
import userSlice from "./userSlice"; 
import videoSlice from "./videoSlice";



const store = configureStore({
    reducer: {
        general: generalSlice,
        user: userSlice,
        audioStorage: audioSlice,
        videoStorage: videoSlice
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }) 
});

export default store;
