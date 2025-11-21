import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <Categories />
      <FeaturedProducts />
    </div>
  );
}