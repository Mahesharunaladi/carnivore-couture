import { create } from 'zustand';
export const useCart = create((set, get) => ({
  items: [],
  cartError: null,

  fetchCart: async (token) => {
    if (!token) {
      set({ items: [], cartError: null });
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/cart', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch cart: ${response.status}`);
      }
      const data = await response.json();
      set({ items: data.cart || [], cartError: null });
    } catch (error) {
      console.error('Error fetching cart:', error.message);
      set({ cartError: 'Unable to load cart from server.' });
    }
  },

  addToCart: async (product, token) => {
    if (!token) {
      set({ cartError: 'Please log in to add items to cart.' });
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error(`Failed to add item: ${response.status}`);
      }
      const data = await response.json();
      set({ items: data.cart, cartError: null });
    } catch (error) {
      console.error('Error adding to cart:', error.message);
      set({ cartError: 'Unable to add item to cart. Please try again.' });
    }
  },

  updateQuantity: async (id, quantity, token) => {
    if (!token) {
      set({ cartError: 'Please log in to update cart items.' });
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/cart/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: id, quantity }),
      });
      if (!response.ok) {
        throw new Error(`Failed to update item quantity: ${response.status}`);
      }
      const data = await response.json();
      set({ items: data.cart, cartError: null });
    } catch (error) {
      console.error('Error updating quantity:', error.message);
      set({ cartError: 'Unable to update item quantity. Please try again.' });
    }
  },

  removeItem: async (id, token) => {
    if (!token) {
      set({ cartError: 'Please log in to remove items from cart.' });
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/cart/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: id }),
      });
      if (!response.ok) {
        throw new Error(`Failed to remove item: ${response.status}`);
      }
      const data = await response.json();
      set({ items: data.cart, cartError: null });
    } catch (error) {
      console.error('Error removing from cart:', error.message);
      set({ cartError: 'Unable to remove item from cart. Please try again.' });
    }
  },

  clearCart: async (token) => {
    if (!token) {
      set({ cartError: 'Please log in to clear the cart.' });
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/cart/clear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to clear cart: ${response.status}`);
      }
      set({ items: [], cartError: null });
    } catch (error) {
      console.error('Error clearing cart:', error.message);
      set({ cartError: 'Unable to clear cart. Please try again.' });
    }
  },

  itemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
  total: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));