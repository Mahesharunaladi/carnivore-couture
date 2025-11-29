import { useState, useEffect } from 'react';
import './App.css';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiShare2, FiBookmark, FiMoreVertical, FiMapPin, FiNavigation } from 'react-icons/fi';
import { motion, useScroll, useTransform } from 'framer-motion';
import Login from './Login.jsx';
import Logo from './components/NewLogo';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';

function App() {
  const [cartItems, setCartItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const y3 = useTransform(scrollY, [0, 300], [0, -150]);

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
      name: 'Chicken Curry Cut - Small Pieces',
      originalPrice: 189,
      discountedPrice: 160,
      weight: '500g',
      deliveryTime: 'Tomorrow 6AM - 8AM',
      discount: '17% off',
      image: 'chicken-curry',
    },
    {
      id: 2,
      name: 'Chicken Breast - Boneless',
      originalPrice: 249,
      discountedPrice: 211,
      weight: '450g',
      deliveryTime: 'Tomorrow 6AM - 8AM',
      discount: '15% off',
      image: 'chicken-breast',
    },
    {
      id: 3,
      name: 'Chicken Boneless - Mini Bites',
      originalPrice: 229,
      discountedPrice: 174,
      weight: '250g',
      deliveryTime: 'Tomorrow 6AM - 8AM',
      discount: '25% off',
      image: 'chicken-boneless',
    },
    {
      id: 4,
      name: 'Chicken Curry Cut - Skin-On Pieces (Large Pack)',
      originalPrice: 304,
      discountedPrice: 240,
      weight: '1000g',
      deliveryTime: 'Tomorrow 6AM - 8AM',
      discount: '21% off',
      image: 'chicken-curry-large',
    },
  ];

  // Sample data for categories
  const categories = [
    { id: 1, name: 'Chicken', image: 'chicken' },
    { id: 2, name: 'Fish & Seafood', image: 'fish' },
    { id: 3, name: 'Ready to Cook', image: 'ready-cook' },
    { id: 4, name: 'Mutton', image: 'mutton' },
    { id: 5, name: 'Prawns & More', image: 'prawns' },
    { id: 6, name: 'Liver & Crabs', image: 'liver' },
    { id: 7, name: 'Eggs', image: 'eggs' },
    { id: 8, name: 'Crispy Snacks', image: 'snacks' },
    { id: 9, name: 'Plant Based Meat', image: 'plant-meat' },
    { id: 10, name: 'Combos', image: 'combos' },
    { id: 11, name: 'Heat & Eat', image: 'heat-eat' },
    { id: 12, name: 'Meat Masala', image: 'masala' },
  ];

  // Sample data for premium fish
  const premiumFish = [
    {
      id: 1,
      name: 'Mackerel Medium - Whole, Cleaned & Gutted',
      originalPrice: 349,
      discountedPrice: 244,
      weight: '500g',
      pieces: '2-4 Pieces',
      serves: '2-3',
      deliveryTime: 'Tomorrow 6AM - 8AM',
      discount: '30% off',
      image: 'mackerel',
    },
    {
      id: 2,
      name: 'Anchovy Medium - Whole, Cleaned & Gutted',
      originalPrice: 499,
      discountedPrice: 351,
      weight: '350g',
      pieces: '20-30 Pieces',
      serves: '2-4',
      deliveryTime: 'Tomorrow 6AM - 8AM',
      discount: '29% off',
      image: 'anchovy',
    },
    {
      id: 3,
      name: 'Seer - Steaks',
      originalPrice: 1299,
      discountedPrice: 1094,
      weight: '300g',
      pieces: '3-5 Pieces',
      serves: '2-3',
      deliveryTime: 'Tomorrow 6AM - 8AM',
      discount: '20% off',
      image: 'seer',
    },
    {
      id: 4,
      name: 'Black Pomfret Small - Cleaned & Cut With Head',
      originalPrice: 1299,
      discountedPrice: 894,
      weight: '400g',
      pieces: '1-2 Pieces',
      serves: '2-3',
      deliveryTime: 'Tomorrow 6AM - 8AM',
      discount: '31% off',
      image: 'pomfret',
    },
  ];

  return (
    <div className="app-container">
      {showLogin ? (
        <Login setShowLogin={setShowLogin} /> // Pass setShowLogin to allow Login component to toggle back
      ) : (
        <>
          {/* Top Navigation Bar */}
          <div className="top-nav">
            <div className="nav-left">
              <button className="menu-btn"><FiMenu /></button>
            </div>
            <div className="nav-center">
              <h1>Carnivore Couture</h1>
              <p>Premium Meat Delivery Service</p>
            </div>
            <div className="nav-right">
              <button className="share-btn"><FiShare2 /></button>
              <button className="bookmark-btn"><FiBookmark /></button>
              <button className="more-btn"><FiMoreVertical /></button>
              <button onClick={() => setShowLogin(true)}>Login</button>
            </div>
          </div>

          {/* Main Header */}
          <header className="main-header">
            <Logo />
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
                disabled={locationLoading}
              >
                <FiNavigation className={locationLoading ? 'rotating' : ''} />
              </button>
            </div>
            <div className="search-bar">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search for any delicious product"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="header-actions">
              <button className="categories-btn">Categories</button>
              <button className="store-btn">Store</button>
              <button className="cart-btn">
                <FiShoppingCart /> Cart ({cartItems})
              </button>
            </div>
          </header>

          {/* Main Content */}
          <div className="main-content">
            {/* Welcome Banner with Parallax */}
            <section className="welcome-banner">
              <motion.div className="parallax-bg" style={{ y: y1 }}>
                <svg width="100%" height="400" viewBox="0 0 1200 400" className="meat-pattern">
                  <defs>
                    <pattern id="meatPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                      <circle cx="50" cy="50" r="20" fill="#ff6b6b" opacity="0.1">
                        <animate attributeName="r" values="20;25;20" dur="3s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="20" cy="80" r="15" fill="#4ecdc4" opacity="0.1">
                        <animate attributeName="r" values="15;20;15" dur="4s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="80" cy="20" r="12" fill="#45b7d1" opacity="0.1">
                        <animate attributeName="r" values="12;18;12" dur="5s" repeatCount="indefinite" />
                      </circle>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#meatPattern)" />
                </svg>
              </motion.div>
              <motion.div className="welcome-text" style={{ y: y2 }}>
                <motion.h2
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Welcome to Carnivore Couture
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Premium meat delivery service with exciting offers just for you!
                </motion.p>
              </motion.div>
              <motion.div className="banner-image" style={{ y: y3 }}>
                <motion.div
                  className="product-image-container"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.img
                    src="/product1.svg"
                    alt="Chicken Curry Cut"
                    className="banner-product-image"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
                <motion.div
                  className="banner-details"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <h3>Chicken Curry Cut & more</h3>
                  <p>Starting at</p>
                  <div className="price-container">
                    <span className="original-price">₹189</span>
                    <motion.span
                      className="discounted-price"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ₹160
                    </motion.span>
                  </div>
                </motion.div>
              </motion.div>
            </section>

            {/* Bestsellers Section */}
            <section className="bestsellers">
              <div className="section-header">
                <h2>Bestsellers</h2>
                <p>Most popular products near you!</p>
              </div>
              <div className="product-grid">
                {featuredProducts.map((product) => (
                  <div className="product-card" key={product.id}>
                    <img
                      src={`/product${product.id}.svg`}
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
                    <div className="product-details">
                      <span className="weight">{product.weight}</span>
                      <span className="pieces">| 4-6 Pieces</span>
                      <span className="serves">| Serves 2-3</span>
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
                {categories.map((category) => {
                  let imagePath = '/vite.svg';
                  if (category.name === 'Chicken') imagePath = '/chicken.svg';
                  else if (category.name === 'Fish & Seafood') imagePath = '/fish.svg';
                  else if (category.name === 'Mutton') imagePath = '/mutton.svg';
                  else if (category.name === 'Eggs') imagePath = '/eggs.svg';
                  else if (category.name === 'Prawns & More') imagePath = '/prawns.svg';

                  return (
                    <div className="category-card" key={category.id}>
                      <img
                        src={imagePath}
                        alt={category.name}
                        className="category-image"
                      />
                      <h3>{category.name}</h3>
                    </div>
                  );
                })}
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
                      src="/fish1.svg"
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

            {/* Meals in Minutes */}
            <section className="meals-minutes">
              <div className="section-header">
                <h2>Meals in Minutes</h2>
                <p>Juicy bites, Ready in no time!</p>
              </div>
              <div className="meals-grid">
                <div className="meal-card">
                  <div className="meal-image-container">
                    <img src="/product1.svg" alt="Quick Chicken Curry" className="meal-image" />
                    <div className="meal-time">15 min</div>
                  </div>
                  <h3>Quick Chicken Curry</h3>
                  <p>Spicy and flavorful curry ready in minutes</p>
                </div>
                <div className="meal-card">
                  <div className="meal-image-container">
                    <img src="/product2.svg" alt="Grilled Fish Fillet" className="meal-image" />
                    <div className="meal-time">10 min</div>
                  </div>
                  <h3>Grilled Fish Fillet</h3>
                  <p>Perfectly seasoned and ready to cook</p>
                </div>
                <div className="meal-card">
                  <div className="meal-image-container">
                    <img src="/product3.svg" alt="Mutton Kebabs" className="meal-image" />
                    <div className="meal-time">20 min</div>
                  </div>
                  <h3>Mutton Kebabs</h3>
                  <p>Juicy kebabs with special spice blend</p>
                </div>
                <div className="meal-card">
                  <div className="meal-image-container">
                    <img src="/product4.svg" alt="Prawn Stir Fry" className="meal-image" />
                    <div className="meal-time">12 min</div>
                  </div>
                  <h3>Prawn Stir Fry</h3>
                  <p>Delicious seafood with minimal prep time</p>
                </div>
              </div>
            </section>
          </div>

          <footer className="footer">
            <p>© 2025 Carnivore Couture. All rights reserved.</p>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;