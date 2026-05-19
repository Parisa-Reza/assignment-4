"use client";

import Link from "next/link";
import { formatCurrency, getCartTotal } from "@/lib/cart-utils";
import { useAppSelector } from "@/store/hooks";

type CartSummaryProps = {
    checkoutHref?: string;
    showCheckoutLink?: boolean;
};

export default function CartSummary({
    checkoutHref = "/checkout",
    showCheckoutLink = true,
}: CartSummaryProps) {
    const items = useAppSelector((state) => state.cart.items);
    const isAuthenticated = useAppSelector(
        (state) => state.auth.status === "authenticated" && Boolean(state.auth.user)
    );
    const { subtotal, total } = getCartTotal(items);
    const href = !items.length
        ? "/"
        : isAuthenticated
          ? checkoutHref
          : `/login?redirect=${encodeURIComponent(checkoutHref)}`;

    return (
        <aside className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-neutral-950">
            <h2 className="text-lg font-bold">Order summary</h2>
            <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                    <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                    <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between gap-4 border-t border-gray-200 pt-3 text-base font-bold dark:border-gray-800">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                </div>
            </div>

            {showCheckoutLink && (
                <Link
                    href={href}
                    className="mt-5 inline-flex w-full justify-center rounded-md bg-pink-600 px-4 py-3 text-sm font-semibold text-white hover:bg-pink-700 dark:bg-pink-200 dark:text-black dark:hover:bg-pink-300"
                >
                    {!items.length
                        ? "Continue shopping"
                        : isAuthenticated
                          ? "Checkout"
                          : "Login to checkout"}
                </Link>
            )}
        </aside>
    );
}
