import { combineReducers, configureStore } from "@reduxjs/toolkit";
import audioSlice from "./audioSlice";
import generalSlice from "./generalSlice";
import userSlice from "./userSlice";
import videoSlice from "./videoSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};
const rootReducer = combineReducers({
    general: generalSlice,
    user: userSlice,
    audioStorage: audioSlice,
    videoStorage: videoSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

export default store;
