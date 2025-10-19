import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  // Fetch cart when user logs in
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart([]); // Clear cart on logout
    }
  }, [user]);

  // Fetch cart from server
  const fetchCart = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/cart', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch cart');
      const data = await response.json();
      setCart(data.cart || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  // Add item to cart
  const addToCart = async (product) => {
    if (!user || !user.token) {
      console.error('User not logged in');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ productId: product.id })
      });
      if (!response.ok) throw new Error('Failed to add item');
      const data = await response.json();
      setCart(data.cart);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      const response = await fetch('http://localhost:3000/api/cart/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ productId }),
      });
      if (!response.ok) throw new Error('Failed to remove item');
      const data = await response.json();
      setCart(data.cart);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);