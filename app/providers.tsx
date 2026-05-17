"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import ThemeProvider from "@/components/layout/ThemeProvider";
import WishlistPersistence from "@/components/product/WishlistPersistence";

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Provider store={store}>
            <ThemeProvider />
            <WishlistPersistence />
            {children}
        </Provider>
    );
}
