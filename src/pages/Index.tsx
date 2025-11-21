import Hero from "../components/Hero";
import CategoryCard from "../components/CategoryCard";
import productMutton from "/public/product-mutton.jpg";
import productChicken from "/public/product-chicken.jpg";
import productFish from "/public/product-fish.jpg";
import productPrawns from "/public/product-prawns.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />

      <section className="py-12 px-4 md:px-8">
        <h2 className="text-4xl font-bold text-center mb-10">
          Explore Our Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <CategoryCard title="Mutton" image={productMutton} />
          <CategoryCard title="Chicken" image={productChicken} />
          <CategoryCard title="Fish" image={productFish} />
          <CategoryCard title="Prawns" image={productPrawns} />
        </div>
      </section>
    </div>
  );
};

export default Index;