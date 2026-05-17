export default function CartLoading() {
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
