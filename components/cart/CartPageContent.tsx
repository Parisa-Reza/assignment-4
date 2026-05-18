"use client";

import Image from "next/image";
import Link from "next/link";
import CartItemControls from "@/components/cart/CartItemControls";
import CartSummary from "@/components/cart/CartSummary";
import { formatCurrency } from "@/lib/cart-utils";
import { useAppSelector } from "@/store/hooks";

export default function CartPageContent() {
    const items = useAppSelector((state) => state.cart.items);

    if (!items.length) {
        return (
            <section className="mx-auto max-w-3xl px-4 py-16 text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Cart
                </p>
                <h1 className="mt-2 text-3xl font-bold">Your cart is empty.</h1>
                <p className="mt-3 text-gray-600 dark:text-gray-300">
                    Add a few products and they will stay here between visits.
                </p>
                <Link
                    href="/"
                    className="mt-6 inline-flex rounded-md bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 dark:bg-pink-200 dark:text-black dark:hover:bg-pink-300"
                >
                    Shop products
                </Link>
            </section>
        );
    }

    return (
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_360px]">
            <section>
                <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Cart
                        </p>
                        <h1 className="mt-1 text-3xl font-bold">Review your items</h1>
                    </div>
                    <Link href="/" className="text-sm font-semibold hover:underline">
                        Continue shopping
                    </Link>
                </div>

                <div className="mt-6 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white dark:divide-gray-800 dark:border-gray-800 dark:bg-neutral-950">
                    {items.map((item) => (
                        <article
                            key={item.id}
                            className="grid gap-4 p-4 sm:grid-cols-[120px_1fr] sm:p-5"
                        >
                            <Link
                                href={`/products/${item.id}`}
                                className="relative aspect-[4/3] overflow-hidden rounded-md bg-gray-100 dark:bg-neutral-900"
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    sizes="120px"
                                    className="object-cover"
                                />
                            </Link>

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                <div className="min-w-0">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {item.categoryName}
                                    </p>
                                    <Link
                                        href={`/products/${item.id}`}
                                        className="mt-1 block font-semibold hover:underline"
                                    >
                                        {item.title}
                                    </Link>
                                    <p className="mt-2 font-bold">
                                        {formatCurrency(item.price)}
                                    </p>
                                </div>
                                <CartItemControls item={item} />
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <CartSummary />
        </div>
    );
}
