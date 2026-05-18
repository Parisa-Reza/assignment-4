"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { getCartItemCount } from "@/lib/cart-utils";
import { toggleTheme, setSearchQuery } from "@/store/ui-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function Navbar() {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.ui.theme);
    const searchQuery = useAppSelector((state) => state.ui.searchQuery);
    const cartItemCount = useAppSelector((state) =>
        getCartItemCount(state.cart.items)
    );
    const [searchText, setSearchText] = useState(searchQuery);

    //debouncing
    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            dispatch(setSearchQuery(searchText));
        }, 350);

        return () => window.clearTimeout(timeoutId);
    }, [dispatch, searchText]);

    return (
        <nav className="border-b border-gray-200  px-4 py-4 backdrop-blur dark:border-gray-800 dark:bg-black/80">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <Link href="/" className="text-xl font-bold text-pink-600 dark:text-pink-200">
                    KenaKata
                </Link>

                <label className="relative w-full md:max-w-md">
                    <span className="sr-only">Search products</span>
                    <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-pink-200" />
                    <input
                        className="w-full rounded-md border border-gray-200 py-2 pl-10 pr-3 text-sm outline-none focus:border-black dark:border-gray-800 dark:bg-neutral-950 dark:focus:border-white"
                        placeholder="Search products..."
                        value={searchText}
                        onChange={(event) => setSearchText(event.target.value)}
                    />
                </label>

                <div className="flex items-center gap-3">
                    <Link
                        href="/cart"
                        aria-label={`Cart with ${cartItemCount} items`}
                        className="relative grid h-10 w-10 place-items-center rounded-md border border-gray-200 dark:border-gray-800"
                    >
                        <FaShoppingCart className="text-pink-600 dark:text-pink-200" aria-hidden="true" />
                        {cartItemCount > 0 && (
                            <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-black px-1 text-xs font-bold text-white dark:bg-white dark:text-black">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>
                    <Link
                        href="/"
                        className=" rounded-md border border-pink-600 px-3 py-2 text-sm text-pink-600 hover:bg-pink-50 dark:border-pink-400 dark:text-pink-200 dark:hover:bg-pink-950/20"
                    >
                        Home
                    </Link>
                    <button
                        type="button"
                        onClick={() => dispatch(toggleTheme())}
                        aria-label="Toggle theme"
                        className="rounded-md border border-gray-200 p-2 dark:border-gray-800"
                    >
                        {theme === "light" ? "🌙" : "☀️"}
                    </button>
                    <button className="rounded-md border border-pink-600 px-3 py-2 text-sm text-pink-600 hover:bg-pink-50 dark:border-pink-400 dark:text-pink-200 dark:hover:bg-pink-950/20">
                        Login
                    </button>
                    <button className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white hover:bg-pink-700 dark:bg-pink-200 dark:text-black dark:hover:bg-pink-300">
                        Signup
                    </button>
                </div>
            </div>
        </nav>
    );
}
