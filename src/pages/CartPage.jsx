import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../App.css'; // Assuming you have some global styles or will create a specific CartPage.css

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);

  console.log('CartPage - cartItems:', cartItems); // Add this line

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page-container">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <h2>Your Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>Price: ${item.price.toFixed(2)}</p>
              <div className="cart-item-quantity-control">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="remove-item-button">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: ${calculateTotal()}</h3>
        <button onClick={clearCart} className="clear-cart-button">Clear Cart</button>
        <button className="checkout-button">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;