"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import ThemeProvider from "@/components/layout/ThemeProvider";

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Provider store={store}>
            <ThemeProvider />
            {children}
        </Provider>
    );
}