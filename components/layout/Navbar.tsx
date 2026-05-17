"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {FaSearch} from "react-icons/fa";
import { toggleTheme, setSearchQuery } from "@/store/ui-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function Navbar() {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.ui.theme);
    const searchQuery = useAppSelector((state) => state.ui.searchQuery);
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
                <Link href="/" className="text-xl font-bold">
                    KenaKata
                </Link>

                <label className="relative w-full md:max-w-md">
                    <span className="sr-only">Search products</span>
                    <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        className="w-full rounded-md border border-gray-200 py-2 pl-10 pr-3 text-sm outline-none focus:border-black dark:border-gray-800 dark:bg-neutral-950 dark:focus:border-white"
                        placeholder="Search products..."
                        value={searchText}
                        onChange={(event) => setSearchText(event.target.value)}
                    />
                </label>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => dispatch(toggleTheme())}
                        aria-label="Toggle theme"
                        className="rounded-md border border-gray-200 p-2 dark:border-gray-800"
                    >
                        {theme === "light" ? "🌙" : "☀️"}
                    </button>
                    <button className="rounded-md border border-gray-200 px-3 py-2 text-sm dark:border-gray-800">
                        Login
                    </button>
                    <button className="rounded-md bg-black px-3 py-2 text-sm text-white dark:bg-white dark:text-black">
                        Signup
                    </button>
                </div>
            </div>
        </nav>
    );
}
