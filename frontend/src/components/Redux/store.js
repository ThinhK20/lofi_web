import { combineReducers, configureStore } from "@reduxjs/toolkit";
import generalSlice from "./generalSlice";
const rootReducer = combineReducers({
    general: generalSlice,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
