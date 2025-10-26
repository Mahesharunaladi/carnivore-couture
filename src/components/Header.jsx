import { useAuth } from '../context/AuthContext'; // Import useAuth

const Header = () => {
  const { user } = useAuth(); // Get user from context

  return (
    <header>
      <div className="user-section">
        {user ? (
          <span>Hey {user?.username || 'User'}, welcome!</span>
        ) : (
          <a href="/login">Login</a>
        )}
      </div>
    </header>
  );
};

export default Header;