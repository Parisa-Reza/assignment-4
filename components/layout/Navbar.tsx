"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toggleTheme, setSearchQuery } from "@/store/ui-slice";

export default function Navbar() {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.ui.theme);

    return (
        <nav className="flex items-center justify-between px-6 py-4 border-b">

            {/* Logo */}
            <div className="text-xl font-bold">
                KenaKata
            </div>

            {/* Search */}
            <input
                className="border px-3 py-1 rounded-md w-1/3"
                placeholder="Search products..."
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            />

            {/* Actions */}
            <div className="flex items-center gap-4">

                {/* Theme */}
                <button
                    onClick={() => dispatch(toggleTheme())}
                    className="px-3 py-1 border rounded"
                >
                    {theme === "light" ? "🌙" : "☀️"}
                </button>

                {/* Auth */}
                <button className="px-3 py-1 border rounded">
                    Login
                </button>
                <button className="px-3 py-1 bg-black text-white rounded">
                    Signup
                </button>
            </div>
        </nav>
    );
}