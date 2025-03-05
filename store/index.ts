import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice"; // Import your chat slice

export const store = configureStore({
    reducer: {
        chat: chatReducer, // Ensure this matches the error
    },
});

// ✅ Define RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
