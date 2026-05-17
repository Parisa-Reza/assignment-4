"use client";

export default function ErrorBoundary({
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <main className="mx-auto max-w-3xl px-4 py-16 text-center">
            <h1 className="text-2xl font-bold">Something went wrong</h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
                The page could not finish loading.
            </p>
            <button
                type="button"
                onClick={reset}
                className="mt-6 rounded-md bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
            >
                Try again
            </button>
        </main>
    );
}
