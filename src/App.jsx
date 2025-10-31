import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { CartDrawer } from "./components/CartDrawer";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Header from "./components/Header"; // Import Header
import { Toaster } from "sonner"; // Import Toaster

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="app-container">
      {/* Remove <Router> here */}
      <Navbar onCartClick={toggleCart} />
      <CartDrawer open={isCartOpen} onClose={toggleCart} />
      <Toaster position="top-center" /> {/* Add Toaster here */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              {/* Remove duplicate Hero (rendered in Index.jsx) */}
              <Index />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;