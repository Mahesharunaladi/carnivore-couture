import { useState, useEffect } from 'react';
import './App.css';
import { FiShoppingCart, FiLogIn } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './components/ProductCard';
import AuthPage from './components/AuthPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const categories = [
    { id: 1, name: 'FISH', icon: '🐟', count: '9 Products' },
    { id: 2, name: 'CHICKEN', icon: '🐔', count: '6 Products' },
    { id: 3, name: 'MUTTON', icon: '🐑', count: '6 Products' },
  ];

  const products = [
    {
      id: 1,
      name: 'Mutton Shoulder',
      price: 720,
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
            onClick={() => setIsCartOpen(true)}
          >
            <FiShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </motion.button>
          <motion.button
            className="login-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAuth(true)}
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
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </section>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <>
          <motion.div 
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            className="cart-sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="cart-header">
              <h2>Your Cart ({cartCount} items)</h2>
              <button 
                className="cart-close"
                onClick={() => setIsCartOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="cart-items">
              {cartItems.length === 0 ? (
                <div className="empty-cart">
                  <FiShoppingCart size={60} />
                  <p>Your cart is empty</p>
                  <button 
                    className="continue-shopping"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  {cartItems.map(item => (
                    <motion.div 
                      key={item.id} 
                      className="cart-item"
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <img 
                        src={`/product-${item.image}.jpg`} 
                        alt={item.name}
                        className="cart-item-image"
                      />
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <p className="cart-item-price">₹{item.price.toLocaleString()}</p>
                        <div className="quantity-controls">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="qty-btn"
                          >
                            -
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="qty-btn"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button 
                        className="remove-item"
                        onClick={() => removeFromCart(item.id)}
                      >
                        🗑️
                      </button>
                    </motion.div>
                  ))}
                </>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total:</span>
                  <span className="total-price">₹{getTotalPrice().toLocaleString()}</span>
                </div>
                <motion.button
                  className="checkout-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Checkout →
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}

      {/* Auth Page */}
      <AnimatePresence>
        {showAuth && (
          <AuthPage onClose={() => setShowAuth(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
