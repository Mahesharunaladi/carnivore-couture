import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../hooks/useCart'; // Import useCart hook
import logo from '/logo.png'; // Assuming logo.png is in the public directory

const Header = () => {
  const { user, logout } = useAuth();
  const { itemCount } = useCart(); // Use itemCount from useCart hook

  console.log('User object in Header:', user);

  return (
    <header className="main-header">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Carnivore Couture Logo" className="logo-image" />
        </Link>
      </div>
      <div className="header-actions">
        {!user ? (
          <div className="login-section">
            <Link to="/cart" className="cart-button">
              <ShoppingCart size={20} />
              <span className="cart-count">{itemCount()}</span> {/* Display dynamic cart count */}
            </Link>
            <Link to="/login" className="login-button">
              Login
            </Link>
          </div>
        ) : (
          <div className="user-section">
            <span className="welcome-message">Welcome, {user?.name || user?.username || 'User'}!</span> {/* Safely access user.name */}
            <Link to="/cart" className="cart-button">
              <ShoppingCart size={20} />
              <span className="cart-count">{itemCount()}</span> {/* Display dynamic cart count */}
            </Link>
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;