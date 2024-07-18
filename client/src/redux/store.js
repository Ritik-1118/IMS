import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice.jsx";
export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
