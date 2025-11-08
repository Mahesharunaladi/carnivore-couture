import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from '/logo.png'; // Assuming logo.png is in the public directory

const Header = () => {
  const { user, logout } = useAuth();

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
            <Link to="/login" className="login-button">
              Login
            </Link>
          </div>
        ) : (
          <div className="user-section">
            <span className="welcome-message">Welcome, {user.name}!</span>
            <Link to="/cart" className="cart-button">
              <ShoppingCart size={20} />
              <span className="cart-count">0</span> {/* Placeholder for cart count */}
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