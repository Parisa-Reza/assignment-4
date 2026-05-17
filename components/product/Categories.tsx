"use client";

import { useEffect } from "react";
import {
    fetchCategories,
    setSelectedCategory,
} from "@/store/product-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function Categories() {
    const dispatch = useAppDispatch();
    const { categories, categoriesLoading, categoriesError, selectedCategoryId } =
        useAppSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <section className="mx-auto max-w-6xl px-4 py-8">
            <div className="mb-4">
                <h2 className="text-2xl font-bold">Categories</h2>
            </div>

            <div className="flex gap-3 flex-wrap">
                <button
                    type="button"
                    onClick={() => dispatch(setSelectedCategory(null))}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                        selectedCategoryId === null
                            ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                            : "border-gray-200 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-neutral-900"
                    }`}
                >
                    All
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        type="button"
                        onClick={() => dispatch(setSelectedCategory(cat.id))}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                            selectedCategoryId === cat.id
                                ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                : "border-gray-200 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-neutral-900"
                        }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {categoriesLoading && (
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                    Loading categories...
                </p>
            )}
            {categoriesError && (
                <p className="mt-3 text-sm text-red-600 dark:text-red-300">
                    {categoriesError}
                </p>
            )}
        </section>
    );
}
