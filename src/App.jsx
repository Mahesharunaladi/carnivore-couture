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
import Loading from './components/Loading';

function App() {
  const [cartItems, setCartItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for the cool animations
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
      {isLoading ? (
        <div className="loading-screen">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="loading-content"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="loading-logo"
            >
              <span className="loading-text">Carnivore Couture</span>
            </motion.div>
            <Loading type="morph" size="large" />
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="loading-subtitle"
            >
              Preparing fresh meats...
            </motion.p>
          </motion.div>
        </div>
      ) : showLogin ? (
        <Login setShowLogin={setShowLogin} />
      ) : (
        <>
          {/* Top Navigation Bar */}
          <div className="top-nav">
            <div className="nav-left">
              <motion.button
                className="menu-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiMenu />
              </motion.button>
            </div>
            <div className="nav-center">
              <motion.h1
                animate={{ color: ["#333", "#d11243", "#333"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Carnivore Couture
              </motion.h1>
              <p>Premium Meat Delivery Service</p>
            </div>
            <div className="nav-right">
              <motion.button
                className="share-btn"
                whileHover={{ scale: 1.1, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <FiShare2 />
              </motion.button>
              <motion.button
                className="bookmark-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiBookmark />
              </motion.button>
              <motion.button
                className="more-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiMoreVertical />
              </motion.button>
              <motion.button
                onClick={() => setShowLogin(true)}
                whileHover={{ scale: 1.05, backgroundColor: "#d11243", color: "white" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Login
              </motion.button>
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
              <motion.button
                className="categories-btn"
                whileHover={{ scale: 1.05, backgroundColor: "#d11243", color: "white" }}
                whileTap={{ scale: 0.95 }}
                animate={{ boxShadow: ["0 0 0 rgba(209, 18, 67, 0)", "0 0 15px rgba(209, 18, 67, 0.5)", "0 0 0 rgba(209, 18, 67, 0)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Categories
              </motion.button>
              <motion.button
                className="store-btn"
                whileHover={{ scale: 1.05, backgroundColor: "#4ecdc4", color: "white" }}
                whileTap={{ scale: 0.95 }}
              >
                Store
              </motion.button>
              <motion.button
                className="cart-btn"
                whileHover={{ scale: 1.05, backgroundColor: "#45b7d1", color: "white" }}
                whileTap={{ scale: 0.95 }}
                animate={cartItems > 0 ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                <FiShoppingCart /> Cart ({cartItems})
              </motion.button>
            </div>
          </header>

          {/* Main Content */}
          <div className="main-content">
            {/* Welcome Banner with Enhanced Parallax */}
            <section className="welcome-banner">
              <motion.div className="parallax-bg parallax-layer-1" style={{ y: y1 }}>
                <svg width="100%" height="400" viewBox="0 0 1200 400" className="meat-pattern">
                  <defs>
                    <pattern id="meatPattern" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
                      <circle cx="75" cy="75" r="25" fill="#ff6b6b" opacity="0.08">
                        <animate attributeName="r" values="25;35;25" dur="4s" repeatCount="indefinite" />
                        <animate attributeName="fill" values="#ff6b6b;#ff4757;#ff6b6b" dur="6s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="25" cy="125" r="18" fill="#4ecdc4" opacity="0.06">
                        <animate attributeName="r" values="18;28;18" dur="5s" repeatCount="indefinite" />
                        <animate attributeName="fill" values="#4ecdc4;#26d0ce;#4ecdc4" dur="7s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="125" cy="25" r="15" fill="#45b7d1" opacity="0.07">
                        <animate attributeName="r" values="15;25;15" dur="6s" repeatCount="indefinite" />
                        <animate attributeName="fill" values="#45b7d1;#17a2b8;#45b7d1" dur="8s" repeatCount="indefinite" />
                      </circle>
                      <path d="M75 50 Q85 35 100 50 Q115 65 100 80 Q85 95 75 80 Q65 65 75 50" fill="#ff3838" opacity="0.05">
                        <animateTransform attributeName="transform" type="scale" values="1;1.2;1" dur="3s" repeatCount="indefinite" />
                      </path>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#meatPattern)" />
                </svg>
              </motion.div>
              
              <motion.div className="parallax-bg parallax-layer-2" style={{ y: y2 }}>
                <div className="floating-elements">
                  <motion.div 
                    className="floating-meat-icon"
                    animate={{ 
                      x: [0, 30, 0], 
                      y: [0, -20, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    🥩
                  </motion.div>
                  <motion.div 
                    className="floating-meat-icon"
                    animate={{ 
                      x: [0, -25, 0], 
                      y: [0, 15, 0],
                      rotate: [0, -180, -360]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  >
                    🐟
                  </motion.div>
                  <motion.div 
                    className="floating-meat-icon"
                    animate={{ 
                      x: [0, 20, 0], 
                      y: [0, -25, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    🍖
                  </motion.div>
                </div>
              </motion.div>

              <motion.div className="welcome-text" style={{ y: y2 }}>
                <motion.h2
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="glitch-text"
                >
                  Welcome to Carnivore Couture
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Premium meat delivery service with <span className="highlight-text">explosive</span> offers just for you!
                </motion.p>
              </motion.div>
              
              <motion.div className="banner-image" style={{ y: y3 }}>
                <motion.div
                  className="product-image-container"
                  whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.img
                    src="/product1.svg"
                    alt="Chicken Curry Cut"
                    className="banner-product-image"
                    animate={{ 
                      y: [0, -10, 0],
                      filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div 
                    className="image-glow"
                    animate={{ 
                      opacity: [0.3, 0.7, 0.3],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
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
                    <motion.span
                      className="original-price"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ₹189
                    </motion.span>
                    <motion.span
                      className="discounted-price"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        color: ["#d11243", "#ff4757", "#d11243"]
                      }}
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
                    <motion.div
                      className="category-card"
                      key={category.id}
                      whileHover={{
                        scale: 1.15,
                        rotate: [0, -3, 3, 0],
                        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                      }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      initial={{ opacity: 0, y: 50, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 50, scale: 0.8 }}
                    >
                      <motion.div
                        className="category-icon-container"
                        animate={{
                          y: [0, -5, 0],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                          duration: 4 + category.id,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: category.id * 0.2
                        }}
                      >
                        <motion.img
                          src={imagePath}
                          alt={category.name}
                          className="category-image"
                          animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{
                            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                            scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: category.id * 0.5 }
                          }}
                          whileHover={{
                            scale: 1.3,
                            filter: "hue-rotate(45deg) brightness(1.2) saturate(1.5)",
                            rotate: 180
                          }}
                        />

                        {/* Dripping effect */}
                        <motion.div
                          className="drip-effect"
                          animate={{
                            scaleY: [0, 1, 0],
                            opacity: [0, 0.8, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: category.id * 0.3,
                            ease: "easeInOut"
                          }}
                        />

                        {/* Morphing background */}
                        <motion.div
                          className="morph-bg"
                          animate={{
                            borderRadius: ["50%", "30%", "70%", "50%"],
                            scale: [1, 1.2, 0.8, 1]
                          }}
                          transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: category.id * 0.4
                          }}
                        />
                      </motion.div>

                      <motion.h3
                        whileHover={{
                          color: "#ff6b6b",
                          scale: 1.1,
                          textShadow: "0 0 10px rgba(255, 107, 107, 0.8)"
                        }}
                        animate={{
                          color: ["#333", "#d11243", "#333"]
                        }}
                        transition={{
                          color: { duration: 4, repeat: Infinity, delay: category.id * 0.6 }
                        }}
                      >
                        {category.name}
                      </motion.h3>

                      {/* Floating particles */}
                      <motion.div
                        className="floating-particles"
                        animate={{
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: category.id * 0.8
                        }}
                      >
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="particle"
                            animate={{
                              x: [0, Math.random() * 40 - 20],
                              y: [0, Math.random() * -30],
                              opacity: [0, 1, 0]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.3 + category.id * 0.2
                            }}
                          >
                            ✨
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
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