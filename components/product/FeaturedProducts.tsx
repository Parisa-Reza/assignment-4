"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/store/product-slice";
import { RootState } from "@/store/store";

export default function FeaturedProducts() {
    const dispatch = useDispatch();
    const { items, loading } = useSelector(
        (state: RootState) => state.products
    );

    useEffect(() => {
        dispatch(fetchProducts() as any);
    }, [dispatch]);

    if (loading) return <p className="p-6">Loading...</p>;

    return (
        <section className="p-6">
            <h2 className="text-xl font-bold mb-4">Featured Products</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {items.map((product) => (
                    <div
                        key={product.id}
                        className="border rounded-lg p-4 shadow"
                    >
                        <img
                            src={product.images?.[0]}
                            className="w-full h-40 object-cover rounded"
                        />
                        <h3 className="font-semibold mt-2">
                            {product.title}
                        </h3>
                        <p className="text-gray-600">${product.price}</p>

                    </div>
                ))}
            </div>
        </section>
    );
}