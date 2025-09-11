import { useState } from 'react';
import './App.css';
import { FiSearch, FiShoppingCart, FiMapPin, FiNavigation } from 'react-icons/fi';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { AuthProvider } from './context/AuthContext';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  const [cartItems, setCartItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);

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
      image: '/chicken.svg' // Added image path
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
      image: '/product2.svg' // Added image path
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
      image: '/mutton.svg' // Added image path
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
      image: '/prawns.svg' // Added image path
    },
  ];

  // Sample data for categories
  const categories = [
    {
      id: 1,
      name: 'Chicken',
      image: '/chicken.svg' // Added image path
    },
    {
      id: 2,
      name: 'Fish & Seafood',
      image: '/fish.svg' // Added image path
    },
    {
      id: 3,
      name: 'Mutton',
      image: '/mutton.svg' // Added image path
    },
    {
      id: 4,
      name: 'Eggs',
      image: '/eggs.svg' // Added image path
    },
    {
      id: 5,
      name: 'Prawns & More',
      image: '/prawns.svg' // Added image path
    },
  ];

  // Sample data for premium fish
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
      image: '/fish1.svg' // Added image path
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
      image: '/fish.svg' // Added image path
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
      image: '/fish1.svg' // Added image path
    },
  ];

  return (
    <AuthProvider>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <>
              <header className="main-header">
                <div className="logo-container">
                  <img src="/logo-removebg-preview.png" alt="Carnivores Couture Logo" className="logo-image" />
                </div>
                <div className="location-selector">
                  <FiMapPin className="location-icon" />
                  <div className="location-text">
                    <span className="location-label">
                      {userLocation ? 'Your Location' : 'Bangalore'}
                      {locationLoading && ' (Loading...)'}
                    </span>
                    <span className="location-details">
                      {userLocation
                        ? `Lat: ${userLocation.latitude.toFixed(4)}, Long: ${userLocation.longitude.toFixed(4)}`
                        : 'HSR, Koramangala, Indiranagar, New BEL Road, Marathahalli, Whitefield, Electronic City'}
                      {locationError && <span className="location-error">{locationError}</span>}
                    </span>
                  </div>
                  <button
                    className="gps-button"
                    onClick={getCurrentLocation}
                    title="Use current location"
                  >
                    <FiNavigation />
                  </button>
                </div>
                <div className="search-bar">
                  <FiSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="header-actions">
                  <button className="cart-button">
                    <FiShoppingCart />
                    {cartItems > 0 && <span className="cart-badge">{cartItems}</span>}
                  </button>
                  <Link to="/login" className="login-button">Login</Link>
                </div>
              </header>

              {/* Welcome Banner */}
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
                        src={product.image} // Use product.image here
                        alt={product.name}
                        className="product-image"
                      />
                      <div
                        className="add-btn"
                        onClick={() => setCartItems(cartItems + 1)}
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
                        src={category.image} // Use category.image here
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
                        src={fish.image} // Use fish.image here
                        alt={fish.name}
                        className="product-image"
                      />
                      <div
                        className="add-btn"
                        onClick={() => setCartItems(cartItems + 1)}
                      >
                        +
                      </div>
                      <h3>{fish.name}</h3>
                      <div className="product-details">
                        <span className="weight">{fish.weight}</span>
                        <span className="pieces">| {fish.pieces}</span>
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

              {/* Remove the old SVG Images section if it exists */}
              {/*
              <section className="svg-gallery">
                <h2>Our Ingredients</h2>
                <div className="svg-grid">
                  <img src="/chicken.svg" alt="Chicken" className="svg-item" />
                  <img src="/eggs.svg" alt="Eggs" className="svg-item" />
                  <img src="/fish.svg" alt="Fish" className="svg-item" />
                  <img src="/fish1.svg" alt="Fish 1" className="svg-item" />
                  <img src="/mutton.svg" alt="Mutton" className="svg-item" />
                  <img src="/prawns.svg" alt="Prawns" className="svg-item" />
                  <img src="/product1.svg" alt="Product 1" className="svg-item" />
                  <img src="/product2.svg" alt="Product 2" className="svg-item" />
                  <img src="/product3.svg" alt="Product 3" className="svg-item" />
                  <img src="/product4.svg" alt="Product 4" className="svg-item" />
                  <img src="/vite.svg" alt="Vite" className="svg-item" />
                  <img src="/welcome-banner.svg" alt="Welcome Banner" className="svg-item" />
                </div>
              </section>
              */}

              <footer className="footer">
                <p>© 2025 Carnivore Couture. All rights reserved.</p>
              </footer>
            </>
          } />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
