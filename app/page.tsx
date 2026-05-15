
import Hero from "@/components/layout/Hero";
import FeaturedProducts from "@/components/product/FeaturedProducts";
import Categories from "@/components/product/Categories";

export default function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedProducts />
    </main>
  );
}