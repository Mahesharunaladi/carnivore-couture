import { useAuth } from '../context/AuthContext';

function Header() {
  const { user } = useAuth();

  return (
    <header>
      // ... existing code ...
      {user && (
        <span>Welcome, {user.name}!</span>
      )}
      // ... existing code ...
    </header>
  );
}

export default Header;