import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui-slice";
import productReducer from "./product-slice";
import cartReducer from "./cart-slice";
import authReducer from "./auth-slice";

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        products: productReducer,
        cart: cartReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
