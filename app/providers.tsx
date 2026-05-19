"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import ThemeProvider from "@/components/layout/ThemeProvider";
import AuthPersistence from "@/components/auth/AuthPersistence";
import CartPersistence from "@/components/cart/CartPersistence";
import WishlistPersistence from "@/components/product/WishlistPersistence";

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Provider store={store}>
            <ThemeProvider />
            <AuthPersistence />
            <WishlistPersistence />
            <CartPersistence />
            {children}
        </Provider>
    );
}
