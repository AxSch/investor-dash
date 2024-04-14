import { configureStore } from '@reduxjs/toolkit';
import investorsReducer from "../reducers/investorsSlice"

const createTestStore = () => {
    return configureStore({
        reducer: {
            investors: investorsReducer,
        },
    });
};

export default createTestStore;
