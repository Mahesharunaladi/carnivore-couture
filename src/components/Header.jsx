import { useAuth } from '../context/AuthContext'; // Import useAuth

const Header = () => {
  const { user } = useAuth(); // Get user from context

  return (
    <header>
      <div className="user-section">
        {user ? (
          <span>Welcome, {user.name || user.username}</span> // Prefer name if available, else username
        ) : (
          <a href="/login">Login</a>
        )}
      </div>
    </header>
  );
};

export default Header;