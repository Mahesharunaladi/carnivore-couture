
import './App.css';
import { FiSearch, FiShoppingCart, FiMapPin, FiNavigation } from 'react-icons/fi';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import CartPage from './pages/CartPage';
import { AuthProvider } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header'; // Add this import
import Hero from './components/Hero'; // Import the new Hero component

function AppContent() {
  const { cart, addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);

  console.log('AppContent - cartItems:', cart);
  console.log('AppContent - addToCart:', addToCart);

  // Function to get user's current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }
    setLocationLoading(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        setLocationLoading(false);
      },
      (error) => {
        setLocationError('Unable to retrieve your location');
        setLocationLoading(false);
        console.error('Error getting location:', error);
      }
    );
  };

  // Sample data for products
  const featuredProducts = [
    {
      id: 1,
      name: 'Chicken Curry Cut',
      description: 'Quick Chicken Curry',
      details: 'Spicy and flavorful curry ready in minutes',
      originalPrice: 250,
      discountedPrice: 199,
      discount: '20% OFF',
      deliveryTime: '15 min',
      image: '/chicken.svg',
      weight: "500g",
      serves: "2-3",
    },
    {
      id: 2,
      name: 'Chicken Breast - Boneless',
      description: 'Grilled Fish Fillet',
      details: 'Perfectly seasoned and ready to cook',
      originalPrice: 300,
      discountedPrice: 240,
      discount: '20% OFF',
      deliveryTime: '10 min',
      image: '/product2.svg',
      weight: "450g",
      serves: "2",
    },
    {
      id: 3,
      name: 'Chicken Boneless - Mini Bites',
      description: 'Mutton Kebabs',
      details: 'Juicy kebabs with special spice blend',
      originalPrice: 350,
      discountedPrice: 280,
      discount: '20% OFF',
      deliveryTime: '20 min',
      image: '/mutton.svg',
      weight: "400g",
      serves: "2-3",
    },
    {
      id: 4,
      name: 'Chicken Curry Cut - Soup Pieces',
      description: 'Prawn Stir Fry',
      details: 'Delicious seafood with minimal prep time',
      originalPrice: 280,
      discountedPrice: 224,
      discount: '20% OFF',
      deliveryTime: '12 min',
      image: '/prawns.svg',
      weight: "350g",
      serves: "2",
    },
  ];

  const categories = [
    { id: 1, name: 'Chicken', image: '/chicken.svg' },
    { id: 2, name: 'Fish & Seafood', image: '/fish.svg' },
    { id: 3, name: 'Mutton', image: '/mutton.svg' },
    { id: 4, name: 'Eggs', image: '/eggs.svg' },
    { id: 5, name: 'Prawns & More', image: '/prawns.svg' }
  ];

  const premiumFish = [
    {
      id: 1,
      name: 'Seer Fish (Surmai) Steaks',
      weight: '500g',
      pieces: '2-3 pcs',
      serves: '2-3',
      originalPrice: 450,
      discountedPrice: 360,
      discount: '20% OFF',
      deliveryTime: '30 min',
      image: '/fish1.svg',
      description: 'Fresh seer fish steaks',
    },
    {
      id: 2,
      name: 'Indian Salmon (Rawas) Fillet',
      weight: '400g',
      pieces: '1 pc',
      serves: '2',
      originalPrice: 500,
      discountedPrice: 400,
      discount: '20% OFF',
      deliveryTime: '25 min',
      image: '/fish.svg',
      description: 'Premium rawas fillet',
    },
    {
      id: 3,
      name: 'Black Pomfret Whole',
      weight: '600g',
      pieces: '1 pc',
      serves: '2-3',
      originalPrice: 550,
      discountedPrice: 440,
      discount: '20% OFF',
      deliveryTime: '35 min',
      image: '/fish1.svg',
      description: 'Whole black pomfret',
    },
  ];

  return (
    <div className="app-container">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/" element={
          <>
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
                <h2>Bestsellers</h2>
                <p>Most loved products by our customers</p>
              </div>
              <div className="product-grid">
                {featuredProducts.map((product) => (
                  <div className="product-card" key={product.id}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                    <div
                      className="add-btn"
                      onClick={() => addToCart(product)}
                    >
                      +
                    </div>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="product-details">
                      <span className="weight">{product.weight}</span>
                      <span className="serves">| Serves {product.serves}</span>
                    </div>
                    <div className="price-container">
                      <span className="original-price">₹{product.originalPrice}</span>
                      <span className="discounted-price">₹{product.discountedPrice}</span>
                      <span className="discount">{product.discount}</span>
                    </div>
                    <div className="delivery-time">{product.deliveryTime}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Shop by Categories */}
            <section className="shop-categories">
              <div className="section-header">
                <h2>Shop by categories</h2>
                <p>Freshest meats and much more!</p>
              </div>
              <div className="categories-grid">
                {categories.map((category) => (
                  <div className="category-card" key={category.id}>
                    <img
                      src={category.image}
                      alt={category.name}
                      className="category-image"
                    />
                    <h3>{category.name}</h3>
                  </div>
                ))}
              </div>
            </section>

            {/* Premium Fish Section */}
            <section className="premium-fish">
              <div className="section-header">
                <h2>Premium fish & seafood selection</h2>
                <p>Same-day catch, fresh & flavorful</p>
              </div>
              <div className="product-grid">
                {premiumFish.map((fish) => (
                  <div className="product-card" key={fish.id}>
                    <img
                      src={fish.image}
                      alt={fish.name}
                      className="product-image"
                    />
                    <div
                      className="add-btn"
                      onClick={() => addToCart(fish)}
                    >
                      +
                    </div>
                    <h3>{fish.name}</h3>
                    <p>{fish.description}</p>
                    <div className="product-details">
                      <span className="weight">{fish.weight}</span>
                      <span className="serves">| Serves {fish.serves}</span>
                    </div>
                    <div className="price-container">
                      <span className="original-price">₹{fish.originalPrice}</span>
                      <span className="discounted-price">₹{fish.discountedPrice}</span>
                      <span className="discount">{fish.discount}</span>
                    </div>
                    <div className="delivery-time">{fish.deliveryTime}</div>
                  </div>
                ))}
              </div>
            </section>
          </>
        } />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;