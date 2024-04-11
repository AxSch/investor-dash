import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"
import investorsReducer from "../reducers/investorsSlice"
import commitmentsReducer from "../reducers/commitmentsSlice"


const investorsPersistConfig = {
    key: "investors",
    storage,
};

const commitmentsPersistConfig = {
    key: "commitments",
    storage,
};

const persistedInvestmentsReducer = persistReducer(investorsPersistConfig, investorsReducer);
const persistedCommitmentsReducer = persistReducer(commitmentsPersistConfig, commitmentsReducer);

export const store = configureStore({
    reducer: {
        investors: persistedInvestmentsReducer,
        commitments: persistedCommitmentsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistedStore = persistStore(store);
