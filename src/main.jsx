import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext'; // Add CartProvider import

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider> {/* Wrap App with CartProvider */}
        <App />
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);
