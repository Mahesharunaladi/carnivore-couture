import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { CartDrawer } from "./components/CartDrawer";
import { Routes, Route } from "react-router-dom";
import Index from './pages/Index.tsx';  // Update to .tsx
import Header from "./components/Header"; // Import Header
import { Toaster } from "sonner"; // Import Toaster
import CartPage from './pages/CartPage';
import Login from './pages/Login'; // Import Login component
import Register from './pages/Register'; // Import Register component

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
        <Route path="/" element={<Index />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} /> {/* Add Login Route */}
        <Route path="/register" element={<Register />} /> {/* Add Register Route */}
      </Routes>
    </div>
  );
}

export default App;