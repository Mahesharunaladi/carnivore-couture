import React from 'react';
import Hero from '../components/Hero';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';

// Image imports (these should work in JS without declarations)
import productChicken from '/public/product-chicken.jpg';
import productThighs from '/public/product-thighs.jpg';
import productWings from '/public/product-wings.jpg';
import productMutton from '/public/product-mutton.jpg';
import productMuttonCurry from '/public/product-mutton-curry.jpg';
import productPrawns from '/public/product-prawns.jpg';
import productCod from '/public/product-cod.jpg';
import productTuna from '/public/product-tuna.jpg';
import productFish from '/public/product-fish.jpg';

const categories = [
  { name: 'Chicken', image: productChicken },
  { name: 'Mutton', image: productMutton },
  { name: 'Seafood', image: productFish },
];

const products = [
  { id: 1, name: 'Chicken Thighs', price: 12.99, image: productThighs },
  { id: 2, name: 'Chicken Wings', price: 9.99, image: productWings },
  { id: 3, name: 'Mutton Curry Cut', price: 19.99, image: productMuttonCurry },
  { id: 4, name: 'Prawns', price: 24.99, image: productPrawns },
  { id: 5, name: 'Cod Fillet', price: 22.99, image: productCod },
  { id: 6, name: 'Tuna Steak', price: 26.99, image: productTuna },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <CategoryCard key={category.name} {...category} />
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Index;