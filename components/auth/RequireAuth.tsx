"use client";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

type RequireAuthProps = {
    children: ReactNode;
};

export default function RequireAuth({ children }: RequireAuthProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { hasHydrated, status, user } = useAppSelector((state) => state.auth);
    const isAuthenticated = status === "authenticated" && Boolean(user);

    useEffect(() => {
        if (!hasHydrated || status === "loading" || isAuthenticated) {
            return;
        }

        router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }, [hasHydrated, isAuthenticated, pathname, router, status]);

    if (!hasHydrated || status === "loading") {
        return (
            <div className="mx-auto max-w-6xl px-4 py-10">
                <div className="h-8 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
                    <div className="h-72 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
                    <div className="h-64 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}
