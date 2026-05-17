export default function Loading() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-10">
            <div className="h-48 animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-900" />
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="h-72 animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-900"
                    />
                ))}
            </div>
        </main>
    );
}
