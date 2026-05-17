
import Hero from "@/components/layout/Hero";
import FeaturedProducts from "@/components/product/FeaturedProducts";
import Categories from "@/components/product/Categories";
import ProductGrid from "@/components/product/ProductGrid";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Categories />
      <ProductGrid />
    </main>
  );
}
