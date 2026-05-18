"use client";

export default function ProductError({
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <main className="mx-auto max-w-3xl px-4 py-16 text-center">
            <h1 className="text-2xl font-bold">Product could not be loaded</h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
                Something went wrong while fetching the product details.
            </p>
            <button
                type="button"
                onClick={reset}
                className="mt-6 rounded-md bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700 dark:bg-pink-200 dark:text-black dark:hover:bg-pink-300"
            >
                Try again
            </button>
        </main>
    );
}
