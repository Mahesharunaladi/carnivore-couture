import { useAuth } from '../context/AuthContext'; // Import useAuth

const Header = () => {
  const { user } = useAuth(); // Get user from context

  return (
    <header>
      <div className="user-section">
        {user ? (
          <span>Welcome, {user.username}</span> // Display username
        ) : (
          <a href="/login">Login</a> // Show login link if not logged in
        )}
      </div>
    </header>
  );
};

export default Header;