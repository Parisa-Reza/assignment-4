export default function LoadingProduct() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-10">
            <div className="grid gap-8 lg:grid-cols-2">
                <div className="aspect-[4/3] animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-900" />
                <div className="space-y-4">
                    <div className="h-8 w-3/4 animate-pulse rounded bg-gray-100 dark:bg-neutral-900" />
                    <div className="h-5 w-1/3 animate-pulse rounded bg-gray-100 dark:bg-neutral-900" />
                    <div className="h-28 animate-pulse rounded bg-gray-100 dark:bg-neutral-900" />
                </div>
            </div>
        </main>
    );
}
