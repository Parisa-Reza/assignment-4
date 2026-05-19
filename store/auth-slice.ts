import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE_URL = "https://api.escuelajs.co/api/v1";

export type AuthTokens = {
    access_token: string;
    refresh_token: string;
};

export type AuthUser = {
    id: number;
    email: string;
    name: string;
    role: string;
    avatar: string;
};

export type LoginCredentials = {
    email: string;
    password: string;
};

export type RegisterCredentials = LoginCredentials & {
    name: string;
    avatar: string;
};

type AuthState = {
    user: AuthUser | null;
    tokens: AuthTokens | null;
    status: "idle" | "loading" | "authenticated" | "unauthenticated";
    error: string | null;
    hasHydrated: boolean;
};

const initialState: AuthState = {
    user: null,
    tokens: null,
    status: "idle",
    error: null,
    hasHydrated: false,
};

async function readJson<T>(response: Response, fallbackMessage: string): Promise<T> {
    const body = (await response.json().catch(() => null)) as
        | { message?: string | string[] }
        | null;

    if (!response.ok) {
        const apiMessage = Array.isArray(body?.message)
            ? body.message.join(" ")
            : body?.message;
        throw new Error(apiMessage || fallbackMessage);
    }

    return body as T;
}

async function loginRequest(credentials: LoginCredentials): Promise<AuthTokens> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    return readJson<AuthTokens>(response, "Unable to sign in with those credentials.");
}

async function profileRequest(accessToken: string): Promise<AuthUser> {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return readJson<AuthUser>(response, "Unable to load your profile.");
}

async function refreshRequest(refreshToken: string): Promise<AuthTokens> {
    const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
    });

    return readJson<AuthTokens>(response, "Your session has expired. Please log in again.");
}

export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials: LoginCredentials) => {
        const tokens = await loginRequest(credentials);
        const user = await profileRequest(tokens.access_token);

        return { tokens, user };
    }
);

export const registerUser = createAsyncThunk(
    "auth/register",
    async (credentials: RegisterCredentials) => {
        const response = await fetch(`${API_BASE_URL}/users/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        await readJson<AuthUser>(response, "Unable to create your account.");

        const tokens = await loginRequest({
            email: credentials.email,
            password: credentials.password,
        });
        const user = await profileRequest(tokens.access_token);

        return { tokens, user };
    }
);

export const restoreSession = createAsyncThunk(
    "auth/restoreSession",
    async (tokens: AuthTokens) => {
        try {
            const user = await profileRequest(tokens.access_token);
            return { tokens, user };
        } catch {
            const refreshedTokens = await refreshRequest(tokens.refresh_token);
            const user = await profileRequest(refreshedTokens.access_token);

            return { tokens: refreshedTokens, user };
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.tokens = null;
            state.status = "unauthenticated";
            state.error = null;
            state.hasHydrated = true;
        },
        markAuthHydrated(state) {
            state.hasHydrated = true;
            if (state.status === "idle") {
                state.status = "unauthenticated";
            }
        },
        clearAuthError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "authenticated";
                state.user = action.payload.user;
                state.tokens = action.payload.tokens;
                state.hasHydrated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "unauthenticated";
                state.user = null;
                state.tokens = null;
                state.error = action.error.message ?? "Unable to log in.";
                state.hasHydrated = true;
            })
            .addCase(registerUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = "authenticated";
                state.user = action.payload.user;
                state.tokens = action.payload.tokens;
                state.hasHydrated = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "unauthenticated";
                state.user = null;
                state.tokens = null;
                state.error = action.error.message ?? "Unable to sign up.";
                state.hasHydrated = true;
            })
            .addCase(restoreSession.pending, (state, action) => {
                state.status = "loading";
                state.tokens = action.meta.arg;
                state.error = null;
            })
            .addCase(restoreSession.fulfilled, (state, action) => {
                state.status = "authenticated";
                state.user = action.payload.user;
                state.tokens = action.payload.tokens;
                state.hasHydrated = true;
            })
            .addCase(restoreSession.rejected, (state) => {
                state.status = "unauthenticated";
                state.user = null;
                state.tokens = null;
                state.error = null;
                state.hasHydrated = true;
            });
    },
});

export const { logout, markAuthHydrated, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
