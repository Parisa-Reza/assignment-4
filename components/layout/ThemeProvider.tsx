"use client";

import { useEffect, useRef } from "react";
import { setTheme, type Theme } from "@/store/ui-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const THEME_STORAGE_KEY = "kenakata-theme";

function isTheme(value: string | null): value is Theme {
    return value === "light" || value === "dark";
}

export default function ThemeProvider() {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.ui.theme);
    const hasLoadedSavedTheme = useRef(false);

    useEffect(() => {
        const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

        if (isTheme(savedTheme)) {
            dispatch(setTheme(savedTheme));
        }

        hasLoadedSavedTheme.current = true;
    }, [dispatch]);

    useEffect(() => {
        const htmlElement = document.documentElement;

        if (theme === "dark") {
            htmlElement.classList.add("dark");
        } else {
            htmlElement.classList.remove("dark");
        }

        if (hasLoadedSavedTheme.current) {
            window.localStorage.setItem(THEME_STORAGE_KEY, theme);
        }
    }, [theme]);

    return null;
}
