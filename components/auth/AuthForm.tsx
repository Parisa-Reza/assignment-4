
"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { loginSchema, signupSchema, type FieldErrors } from "@/lib/zod-scemas/auth-schema";
import {
    clearAuthError,
    loginUser,
    registerUser,
    type RegisterCredentials,
} from "@/store/auth-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type AuthFormMode = "login" | "signup";

type AuthFormProps = {
    mode: AuthFormMode;
};

const defaultAvatar = "https://picsum.photos/800";

function getSafeRedirect(value: string | null) {
    if (!value || !value.startsWith("/") || value.startsWith("//")) {
        return "/";
    }

    return value;
}

export default function AuthForm({ mode }: AuthFormProps) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { status, error, user } = useAppSelector((state) => state.auth);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(defaultAvatar);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const isSignup = mode === "signup";
    const isLoading = status === "loading";
    const redirectTo = useMemo(
        () => getSafeRedirect(searchParams.get("redirect")),
        [searchParams]
    );

    useEffect(() => {
        dispatch(clearAuthError());
        setFieldErrors({});
    }, [dispatch, mode]);

    useEffect(() => {
        if (status === "authenticated" && user) {
            router.replace(redirectTo);
        }
    }, [redirectTo, router, status, user]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const raw = isSignup
            ? { name, email, password, avatar }
            : { email, password };

        const result = isSignup
            ? signupSchema.safeParse(raw)
            : loginSchema.safeParse(raw);

        if (!result.success) {
            const errors: FieldErrors = {};
            for (const issue of result.error.issues) {
                const key = issue.path[0] as keyof FieldErrors;
                if (!errors[key]) errors[key] = issue.message;
            }
            setFieldErrors(errors);
            return;
        }

        setFieldErrors({});

        if (isSignup) {
            const payload: RegisterCredentials = {
                name: name.trim(),
                email: email.trim(),
                password,
                avatar: avatar.trim() || defaultAvatar,
            };

            await dispatch(registerUser(payload));
            return;
        }

        await dispatch(loginUser({ email: email.trim(), password }));
    };

    return (
        <section className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-10">
            <form
                onSubmit={handleSubmit}
                className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-neutral-950"
                noValidate
            >
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-pink-600 dark:text-pink-200">
                        {isSignup ? "Create account" : "Welcome back"}
                    </p>
                    <h1 className="mt-2 text-3xl font-bold">
                        {isSignup ? "Sign up for KenaKata" : "Log in to KenaKata"}
                    </h1>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {isSignup
                            ? "Create an account before adding products or checking out."
                            : "Log in before adding products or checking out."}
                    </p>
                </div>

                <div className="mt-6 grid gap-4">
                    {isSignup && (
                        <Field
                            label="Name"
                            value={name}
                            onChange={setName}
                            autoComplete="name"
                            error={fieldErrors.name}
                        />
                    )}
                    <Field
                        label="Email"
                        type="email"
                        value={email}
                        onChange={setEmail}
                        autoComplete="email"
                        error={fieldErrors.email}
                    />
                    <Field
                        label="Password"
                        type="password"
                        value={password}
                        onChange={setPassword}
                        autoComplete={isSignup ? "new-password" : "current-password"}
                        error={fieldErrors.password}
                    />
                    {isSignup && (
                        <Field
                            label="Avatar URL"
                            type="url"
                            value={avatar}
                            onChange={setAvatar}
                            autoComplete="url"
                            error={fieldErrors.avatar}
                        />
                    )}
                </div>

                {error && (
                    <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-200">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-6 inline-flex w-full justify-center rounded-md bg-pink-600 px-4 py-3 text-sm font-semibold text-white hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-pink-200 dark:text-black dark:hover:bg-pink-300"
                >
                    {isLoading
                        ? isSignup
                            ? "Creating account..."
                            : "Logging in..."
                        : isSignup
                            ? "Sign up"
                            : "Log in"}
                </button>

                <p className="mt-5 text-center text-sm text-gray-500 dark:text-gray-400">
                    {isSignup ? "Already have an account?" : "Need an account?"}{" "}
                    <Link
                        href={`${isSignup ? "/login" : "/signup"}?redirect=${encodeURIComponent(redirectTo)}`}
                        className="font-semibold text-pink-600 hover:underline dark:text-pink-200"
                    >
                        {isSignup ? "Log in" : "Sign up"}
                    </Link>
                </p>
            </form>
        </section>
    );
}

type FieldProps = {
    label: string;
    value: string;
    type?: string;
    autoComplete?: string;
    error?: string;
    onChange: (value: string) => void;
};

function Field({
    label,
    value,
    type = "text",
    autoComplete,
    error,
    onChange,
}: FieldProps) {
    return (
        <label className="grid gap-2 text-sm">
            <span className="font-medium">{label}</span>
            <input
                type={type}
                value={value}
                autoComplete={autoComplete}
                onChange={(event) => onChange(event.target.value)}
                aria-invalid={!!error}
                className={`h-11 rounded-md border px-3 outline-none transition-colors
                    ${error
                        ? "border-red-400 focus:border-red-500 dark:border-red-600 dark:focus:border-red-400"
                        : "border-gray-200 focus:border-black dark:border-gray-800 dark:focus:border-white"
                    }
                    dark:bg-neutral-950`}
            />
            {error && (
                <span className="text-xs text-red-600 dark:text-red-400">{error}</span>
            )}
        </label>
    );
}