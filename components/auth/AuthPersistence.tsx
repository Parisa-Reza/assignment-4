"use client";

import { useEffect, useRef } from "react";
import {
    AUTH_STORAGE_KEY,
    clearAuthCookie,
    isSavedAuthSession,
    setAuthCookie,
} from "@/lib/auth-storage";
import { markAuthHydrated, restoreSession } from "@/store/auth-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function AuthPersistence() {
    const dispatch = useAppDispatch();
    const tokens = useAppSelector((state) => state.auth.tokens);
    const status = useAppSelector((state) => state.auth.status);
    const hasHydrated = useAppSelector((state) => state.auth.hasHydrated);
    const hasLoadedSavedAuth = useRef(false);

    useEffect(() => {
        const savedAuth = window.localStorage.getItem(AUTH_STORAGE_KEY);

        if (!savedAuth) {
            dispatch(markAuthHydrated());
            hasLoadedSavedAuth.current = true;
            return;
        }

        try {
            const parsedAuth = JSON.parse(savedAuth);

            if (isSavedAuthSession(parsedAuth)) {
                dispatch(restoreSession(parsedAuth.tokens));
            } else {
                window.localStorage.removeItem(AUTH_STORAGE_KEY);
                clearAuthCookie();
                dispatch(markAuthHydrated());
            }
        } catch {
            window.localStorage.removeItem(AUTH_STORAGE_KEY);
            clearAuthCookie();
            dispatch(markAuthHydrated());
        }

        hasLoadedSavedAuth.current = true;
    }, [dispatch]);

    useEffect(() => {
        if (!hasLoadedSavedAuth.current || !hasHydrated) {
            return;
        }

        if (status === "authenticated" && tokens) {
            window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ tokens }));
            setAuthCookie();
            return;
        }

        if (status === "unauthenticated") {
            window.localStorage.removeItem(AUTH_STORAGE_KEY);
            clearAuthCookie();
        }
    }, [hasHydrated, status, tokens]);

    return null;
}
