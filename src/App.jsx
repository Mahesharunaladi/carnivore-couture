import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { CartDrawer } from "./components/CartDrawer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Header from "./components/Header"; // Import Header
import Hero from "./components/Hero";     // Import Hero
import { Toaster } from "sonner"; // Import Toaster

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="app-container">
      <Router>
        <Navbar onCartClick={toggleCart} />
        <CartDrawer open={isCartOpen} onClose={toggleCart} />
        <Toaster position="top-center" /> {/* Add Toaster here */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Hero />
                <Index />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;