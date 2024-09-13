import { configureStore } from '@reduxjs/toolkit';
import ComopanyReducer from '../Features/CompanySlice';
import JobsReducer from "../Features/JobsSlice"

export const store = configureStore({
    reducer: {
        Company: ComopanyReducer,
        Jobs:JobsReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
