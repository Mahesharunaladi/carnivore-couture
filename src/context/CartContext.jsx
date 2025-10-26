
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]); // Initialize as empty array
  const [cartError, setCartError] = useState(null); // For error handling

  // Fetch cart when user changes
  useEffect(() => {
    if (user && user.token) {
      fetchCart();
    } else {
      setCart([]); // Clear cart if no user
      console.log('No user logged in, cart cleared');
    }
  }, [user]);

  // Fetch cart from server
  const fetchCart = async () => {
    try {
      console.log('Fetching cart for user:', user.email);
      const response = await fetch('http://localhost:3000/api/cart', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch cart: ${response.status}`);
      }
      const data = await response.json();
      console.log('Cart fetched:', data.cart);
      setCart(data.cart || []);
    } catch (error) {
      console.error('Error fetching cart:', error.message);
      setCartError('Unable to load cart. Please try again.');
      setCart([]); // Ensure cart is defined
    }
  };

  // Add item to cart
  const addToCart = async (product) => {
    if (!user || !user.token) {
      console.error('User not logged in');
      setCartError('Please log in to add items to cart.');
      return;
    }
    try {
      console.log('Adding to cart:', product);
      const response = await fetch('http://localhost:3000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error(`Failed to add item: ${response.status}`);
      }
      const data = await response.json();
      console.log('Cart updated:', data.cart);
      setCart(data.cart);
      setCartError(null);
    } catch (error) {
      console.error('Error adding to cart:', error.message);
      setCartError('Unable to add item to cart. Please try again.');
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    if (!user || !user.token) {
      console.error('User not logged in');
      setCartError('Please log in to remove items from cart.');
      return;
    }
    try {
      console.log('Removing item:', productId);
      const response = await fetch('http://localhost:3000/api/cart/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ productId }),
      });
      if (!response.ok) {
        throw new Error(`Failed to remove item: ${response.status}`);
      }
      const data = await response.json();
      console.log('Cart updated after removal:', data.cart);
      setCart(data.cart);
      setCartError(null);
    } catch (error) {
      console.error('Error removing from cart:', error.message);
      setCartError('Unable to remove item from cart. Please try again.');
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartError }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);