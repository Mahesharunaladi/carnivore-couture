import React from 'react';
// Added explicit .tsx extensions for component imports
import Hero from '../components/Hero.tsx';
import CategoryCard from '../components/CategoryCard';
import { ProductCard } from '../components/ProductCard.tsx';

// Replaced invalid template literal imports with require (supports dynamic PUBLIC_URL)
const productChicken = require(`${process.env.PUBLIC_URL}/product-chicken.jpg`) as string;
const productThighs = require(`${process.env.PUBLIC_URL}/product-thighs.jpg`) as string;
const productWings = require(`${process.env.PUBLIC_URL}/product-wings.jpg`) as string;
const productMutton = require(`${process.env.PUBLIC_URL}/product-mutton.jpg`) as string;
const productMuttonCurry = require(`${process.env.PUBLIC_URL}/product-mutton-curry.jpg`) as string;
const productPrawns = require(`${process.env.PUBLIC_URL}/product-prawns.jpg`) as string;
const productCod = require(`${process.env.PUBLIC_URL}/product-cod.jpg`) as string;
const productTuna = require(`${process.env.PUBLIC_URL}/product-tuna.jpg`) as string;
const productFish = require(`${process.env.PUBLIC_URL}/product-fish.jpg`) as string;

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