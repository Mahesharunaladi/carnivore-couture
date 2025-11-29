import { useState, useEffect } from 'react';
import './App.css';
import { FiShoppingCart, FiLogIn } from 'react-icons/fi';
import { motion } from 'framer-motion';
import ProductCard from './components/ProductCard';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cartCount, setCartCount] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: 1, name: 'FISH', icon: '🐟', count: '9 Products' },
    { id: 2, name: 'CHICKEN', icon: '🐔', count: '6 Products' },
    { id: 3, name: 'MUTTON', icon: '🐑', count: '6 Products' },
  ];

  const products = [
    {
      id: 1,
      name: 'Mutton Shoulder',
      price: 7200,
      image: 'mutton',
    },
    {
      id: 2,
      name: 'Chicken Breast',
      price: 450,
      image: 'chicken',
    },
    {
      id: 3,
      name: 'Fresh Cod Fish',
      price: 1200,
      image: 'cod',
    },
    {
      id: 4,
      name: 'Mutton Curry Cut',
      price: 890,
      image: 'mutton-curry',
    },
    {
      id: 5,
      name: 'Fresh Prawns',
      price: 1500,
      image: 'prawns',
    },
    {
      id: 6,
      name: 'Chicken Thighs',
      price: 380,
      image: 'thighs',
    },
    {
      id: 7,
      name: 'Fresh Tuna',
      price: 950,
      image: 'tuna',
    },
    {
      id: 8,
      name: 'Chicken Wings',
      price: 320,
      image: 'wings',
    },
  ];

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <motion.div
            className="loading-text"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            CARNIVORE COUTURE
          </motion.div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{
              width: '50px',
              height: '50px',
              border: '3px solid rgba(220, 38, 38, 0.3)',
              borderTop: '3px solid #dc2626',
              borderRadius: '50%',
              margin: '2rem auto'
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="logo">CARNIVORE COUTURE</div>
        <div className="header-actions">
          <motion.button
            className="cart-icon"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </motion.button>
          <motion.button
            className="login-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiLogIn size={18} />
            Login
          </motion.button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">
            <span className="red-text">CARNIVORE</span>
            <span className="white-text">COUTURE</span>
          </h1>
          <p className="hero-subtitle">
            Experience the finest selection of premium meats.
          </p>
          <p className="hero-tagline">
            Bold flavors. Exceptional quality.
          </p>
          <div className="hero-buttons">
            <motion.button
              className="btn-shop-now"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Now →
            </motion.button>
            <motion.button
              className="btn-view-collection"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Collection
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <motion.div
          className="stat-item"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="stat-number">100%</div>
          <div className="stat-label">Premium Quality</div>
        </motion.div>
        <motion.div
          className="stat-item"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="stat-number">24/7</div>
          <div className="stat-label">Customer Support</div>
        </motion.div>
        <motion.div
          className="stat-item"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="stat-number">50K+</div>
          <div className="stat-label">Happy Customers</div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2 className="section-title">EXPLORE CATEGORIES</h2>
          <p className="section-subtitle">Curated selections for every carnivore</p>
        </div>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className="category-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="category-icon">{category.icon}</div>
              <div className="category-name">{category.name}</div>
              <div className="category-count">{category.count}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="section-header">
          <h2 className="section-title">FEATURED PRODUCTS</h2>
          <p className="section-subtitle">Our most popular premium selections</p>
        </div>
        <div className="products-grid">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
