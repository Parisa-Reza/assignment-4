"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/store/product-slice";
import { RootState } from "@/store/store";

export default function Categories() {
    const dispatch = useDispatch();
    const categories = useSelector(
        (state: RootState) => state.products.categories
    );

    useEffect(() => {
        dispatch(fetchCategories() as any);
    }, [dispatch]);

    return (
        <section className="p-6">
            <h2 className="text-xl font-bold mb-4">Categories</h2>

            <div className="flex gap-3 flex-wrap">
                {categories.map((cat) => (
                    <span
                        key={cat.id}
                        className="px-4 py-2 border rounded-full text-sm cursor-pointer hover:bg-gray-100"
                    >
                        {cat.name}
                    </span>
                ))}
            </div>
        </section>
    );
}