import { useAuth } from '../context/AuthContext';

function Header() {
  const { user } = useAuth();

  return (
    <header>
      {user && (
        <span>Welcome, {user.username}!</span>
      )}
    </header>
  );
}

export default Header;