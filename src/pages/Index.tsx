import React from 'react';
// Added explicit .tsx extensions for component imports
import { Hero } from '../components/Hero.tsx';
import { CategoryCard } from '../components/CategoryCard.tsx';
import { ProductCard } from '../components/ProductCard.tsx';

// Replaced invalid template literal imports with require (supports dynamic PUBLIC_URL)
const productChicken = '/product-chicken.jpg';
const productThighs = '/product-thighs.jpg';
const productWings = '/product-wings.jpg';
const productMutton = '/product-mutton.jpg';
const productMuttonCurry = '/product-mutton-curry.jpg';
const productPrawns = '/product-prawns.jpg';
const productCod = '/product-cod.jpg';
const productTuna = '/product-tuna.jpg';
const productFish = '/product-fish.jpg';

const categories = [
  { name: 'Chicken', image: productChicken, count: 3 },
  { name: 'Mutton', image: productMutton, count: 2 },
  { name: 'Seafood', image: productFish, count: 3 },
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
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-12 text-center font-display leading-tight">
            Shop by <span className="text-red-600">Category</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {categories.map((category, index) => (
              <CategoryCard key={category.name} title={category.name} icon={category.image} count={category.count} index={index} />
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-12 text-center font-display leading-tight">
            Featured <span className="text-red-600">Products</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} {...product} index={product.id} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 text-lg">No featured products available.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Index;