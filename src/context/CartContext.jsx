import React, { createContext, useState, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  console.log('CartProvider initialized'); // Add this line
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    console.log('Adding product:', product); // Log the product being added
    setCartItems((prevItems) => {
      console.log('Current cart items (prevItems):', prevItems); // Log current cart items
      const existingItem = prevItems.find((item) => item.id === product.id);
      const price = product.discountedPrice || product.originalPrice || 0; // Determine the price

      let newItems;
      if (existingItem) {
        newItems = prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newItems = [...prevItems, { ...product, quantity: 1, price }]; // Add price to the product
      }
      console.log('New cart items (after update):', newItems); // Log new cart items
      return newItems;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: parseInt(quantity) } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};