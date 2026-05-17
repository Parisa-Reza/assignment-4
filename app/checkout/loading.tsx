export default function CheckoutLoading() {
    return (
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_360px]">
            <div className="h-[520px] animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
            <div className="h-64 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
        </div>
    );
}
