"use client";

export default function CartError({
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
            <h1 className="text-2xl font-bold">Cart could not load.</h1>
            <button
                type="button"
                onClick={reset}
                className="mt-5 rounded-md bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 dark:bg-pink-200 dark:text-black dark:hover:bg-pink-300"
            >
                Try again
            </button>
        </div>
    );
}
