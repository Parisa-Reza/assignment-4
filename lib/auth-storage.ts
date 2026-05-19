import type { AuthTokens } from "@/store/auth-slice";

export const AUTH_STORAGE_KEY = "kenakata-auth";
export const AUTH_COOKIE_NAME = "kenakata_auth";

export type SavedAuthSession = {
    tokens: AuthTokens;
};

export function isSavedAuthSession(value: unknown): value is SavedAuthSession {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const session = value as Partial<SavedAuthSession>;

    return (
        typeof session.tokens?.access_token === "string" &&
        typeof session.tokens.refresh_token === "string"
    );
}

export function setAuthCookie() {
    document.cookie = `${AUTH_COOKIE_NAME}=1; path=/; max-age=${60 * 60 * 24 * 20}; SameSite=Lax`;
}

export function clearAuthCookie() {
    document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
}
