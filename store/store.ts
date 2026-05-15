import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui-slice";
import productReducer from "./product-slice";

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        products: productReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;