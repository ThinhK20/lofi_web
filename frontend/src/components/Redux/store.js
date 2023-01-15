import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./generalSlice";
import userSlice from "./userSlice"; 



const store = configureStore({
    reducer: {
        general: generalSlice,
        user: userSlice,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }) 
});

export default store;
