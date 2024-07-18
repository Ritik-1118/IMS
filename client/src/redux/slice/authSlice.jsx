import { createSlice } from "@reduxjs/toolkit";
// import { encryptData } from "../../utils/encryptData";

const initialState = {
    token:
        typeof window !== "undefined"
            ? localStorage.getItem( "token" ) || null
            : null,
    user:
        typeof window !== "undefined"
            ? localStorage.getItem( "user" ) || null
            : null,
};

export const authSlice = createSlice( {
    name: "auth",
    initialState,
    reducers: {
        login: ( state, action ) => {
            const { user, token } = action.payload;
            state.user = user ;
            state.token = token;
            localStorage.setItem( "token", token );
            // localStorage.setItem( "user", encryptData( JSON.stringify( user ) ) );
            localStorage.setItem( "user", JSON.stringify( user ) );
        },
        logout: ( state ) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem( "token" );
            localStorage.removeItem( "user" );
        },
    },
} );

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
