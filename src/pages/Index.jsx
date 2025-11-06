import React from 'react';
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { CategoryCard } from "@/components/CategoryCard";
import { Navbar } from "@/components/Navbar";
import { CartDrawer } from "@/components/CartDrawer";
import { motion } from "framer-motion";
import { Fish, Bird, Waves } from "lucide-react";
import { useState } from "react";
import productChicken from "@/assets/product-chicken.jpg";
import productFish from "@/assets/product-fish.jpg";
import productMutton from "@/assets/product-mutton.jpg";
import productWings from "@/assets/product-wings.jpg";
import productTuna from "@/assets/product-tuna.jpg";
import productPrawns from "@/assets/product-prawns.jpg";
import productMuttonCurry from "@/assets/product-mutton-curry.jpg";
import productThighs from "@/assets/product-thighs.jpg";
import productCod from "@/assets/product-cod.jpg";

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const products = [
    // Chicken Products
    {
      name: "Premium Chicken Breast",
      price: 3750,
      originalPrice: 5200,
      image: productChicken,
      badge: "PREMIUM",
    },
    // ... existing code ... (include all chicken products here)
    // Fish Products
    {
      name: "Wild Salmon Fillet",
      price: 6500,
      originalPrice: 7900,
      image: productFish,
      badge: "PREMIUM",
    },
    // ... existing code ... (include all fish products here)
    // Mutton Products
    {
      name: "Lamb Chops",
      price: 7400,
      image: productMutton,
      badge: "PREMIUM",
    },
    // ... existing code ... (include all mutton products here)
  ];

  const categories = [
    { title: "Fish", icon: Fish, count: 9 },
    { title: "Chicken", icon: Bird, count: 6 },
    { title: "Mutton", icon: Waves, count: 6 },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Hero />
      <div className="section-title">
        <h2>FEATURED PRODUCTS</h2>
        <p>Our most popular premium selections</p>
      </div>

      <div className="products">
        <div className="product-card">
          <img src="/product-chicken.jpg" alt="Chicken" />
          <div className="badge">PREMIUM</div>
          <div className="product-info">
            <h3>PREMIUM CHICKEN</h3>
            <div className="price">
              <span className="current">₹3,750</span>
              <span className="old">₹5,200</span>
            </div>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        </div>

        <div className="product-card">
          <img src="/product-wings.jpg" alt="Chicken Wings" />
          <div className="badge">BESTSELLER</div>
          <div className="product-info">
            <h3>CHICKEN WINGS</h3>
            <div className="price">
              <span className="current">₹2,800</span>
              <span className="old">₹3,500</span>
            </div>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        </div>

        <div className="product-card">
          <img src="/product-mutton.jpg" alt="Mutton" />
          <div className="badge">PREMIUM</div>
          <div className="product-info">
            <h3>PREMIUM MUTTON</h3>
            <div className="price">
              <span className="current">₹3,750</span>
              <span className="old">₹5,200</span>
            </div>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        </div>

        <div className="product-card">
          <img src="/product-thighs.jpg" alt="Chicken Thighs" />
          <div className="badge">BESTSELLER</div>
          <div className="product-info">
            <h3>CHICKEN THIGHS</h3>
            <div className="price">
              <span className="current">₹2,800</span>
              <span className="old">₹3,500</span>
            </div>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        </div>

        <div className="product-card">
          <img src="/product-prawns.jpg" alt="Prawns" />
          <div className="badge">FRESH</div>
          <div className="product-info">
            <h3>FRESH PRAWNS</h3>
            <div className="price">
              <span className="current">₹4,500</span>
            </div>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        </div>

        <div className="product-card">
          <img src="/product-fish.jpg" alt="Fish" />
          <div className="product-info">
            <h3>FRESH FISH</h3>
            <div className="price">
              <span className="current">₹3,200</span>
            </div>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        </div>

        <div className="product-card">
          <img src="/product-cod.jpg" alt="Cod" />
          <div className="badge">PREMIUM</div>
          <div className="product-info">
            <h3>PREMIUM COD</h3>
            <div className="price">
              <span className="current">₹4,000</span>
            </div>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        </div>

        <div className="product-card">
          <img src="/product-tuna.jpg" alt="Tuna" />
          <div className="badge">FRESH</div>
          <div className="product-info">
            <h3>FRESH TUNA</h3>
            <div className="price">
              <span className="current">₹3,500</span>
            </div>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;