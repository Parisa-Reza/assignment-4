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
                className="mt-5 rounded-md bg-black px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-black"
            >
                Try again
            </button>
        </div>
    );
}
