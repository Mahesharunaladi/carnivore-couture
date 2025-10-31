function AppContent() {
  import { useState } from "react";
  import { Navbar } from "./components/Navbar";
  import { CartDrawer } from "./components/CartDrawer";

  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  return (
    <div className="app-container">
      <Navbar onCartClick={toggleCart} />
      <CartDrawer open={isCartOpen} onClose={toggleCart} />
      <Header />
      <Hero /> {/* Render the Hero component here */}

      {/* The old Welcome Banner section will be removed */}
      {/*
      <section className="welcome-banner">
        <div className="welcome-text">
          <h2>Welcome to Carnivore Couture</h2>
          <p>Premium meat delivery service with exciting offers just for you!</p>
        </div>
        <div className="banner-image">
          <div className="product-image-container">
            <img src="/product1.svg" alt="Chicken Curry Cut" className="banner-product-image" />
          </div>
          <div className="banner-details">
            <h3>Chicken Curry Cut & more</h3>
            <p>Starting at</p>
            <div className="price-container">
              <span className="original-price">₹189</span>
              <span className="discounted-price">₹160</span>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* Bestsellers Section */}
      <section className="bestsellers">
        <div className="section-header">
// ... existing code ...