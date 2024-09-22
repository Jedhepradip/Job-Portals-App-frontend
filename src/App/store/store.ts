import { configureStore } from '@reduxjs/toolkit';
import ComopanyReducer from '../Features/CompanySlice';
import JobsReducer from "../Features/JobsSlice"
import UserData from "../Features/UserSlice"
import Application from "../Features/ApplicationSlice"

export const store = configureStore({
    reducer: {
        Company: ComopanyReducer,
        Jobs: JobsReducer,
        User: UserData,
        Applicants: Application,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
