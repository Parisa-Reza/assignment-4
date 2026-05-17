"use client";

import Hero from "@/components/layout/Hero";
import Categories from "@/components/product/Categories";
import FeaturedProducts from "@/components/product/FeaturedProducts";
import ProductGrid from "@/components/product/ProductGrid";
import { useAppSelector } from "@/store/hooks";

export default function HomeProductSections() {
  const searchQuery = useAppSelector((state) => state.ui.searchQuery.trim());
  const isSearching = searchQuery.length > 0;

  if (isSearching) {
    return (
      <main>
        <ProductGrid />
      </main>
    );
  }

  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Categories />
      <ProductGrid />
    </main>
  );
}
