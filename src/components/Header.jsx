import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <header className="main-header">
      {/* New login section */}
      <div className="login-section">
        {!user && (
          <Link to="/login" className="login-button">Login</Link>
        )}
      </div>

      <div className="user-section">
        {user ? (
          <> 
            <span>Hey {user?.username || 'User'}, welcome!</span>
            <Link to="/cart" className="cart-button">
              <FiShoppingCart />
              <span className="cart-count">{cart.length}</span>
            </Link>
            <button onClick={logout} className="logout-button">Logout</button>
          </>
        ) : null}
      </div>
    </header>
  );
};

export default Header;