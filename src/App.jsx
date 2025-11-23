// src/App.tsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Index from './pages/Index';
import MuttonPage from './pages/MuttonPage';
import ChickenPage from './pages/ChickenPage';
import FishPage from './pages/FishPage';
import AboutUsPage from './pages/AboutUsPage';
import CartDrawer from './components/CartDrawer';
import Header from './components/Header';

function App() {
  const location = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="app-container">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
              >
                <Index />
              </motion.div>
            }
          />
          <Route
            path="/login"
            element={
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
              >
                <Login />
              </motion.div>
            }
          />
          <Route
            path="/register"
            element={
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
              >
                <Register />
              </motion.div>
            }
          />
          <Route
            path="/mutton"
            element={
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
              >
                <MuttonPage />
              </motion.div>
            }
          />
          <Route
            path="/chicken"
            element={
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
              >
                <ChickenPage />
              </motion.div>
            }
          />
          <Route
            path="/fish"
            element={
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
              >
                <FishPage />
              </motion.div>
            }
          />
          <Route
            path="/prawns"
            element={
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
              >
                {/* Placeholder for PrawnsPage */}
                <h1 className="text-white">Prawns Page Coming Soon!</h1>
              </motion.div>
            }
          />
          <Route
            path="/about-us"
            element={
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
              >
                <AboutUsPage />
              </motion.div>
            }
          />
          <Route
            path="/about-us"
            element={
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
              >
                <AboutUsPage />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default App;