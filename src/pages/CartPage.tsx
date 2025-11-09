
import React from 'react';
import { useCart } from '@/hooks/useCart';

const CartPage: React.FC = () => {
  const { items, total } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b py-4">
              <div className="flex items-center">
                {item.image && <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />}
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
              </div>
              <p className="text-lg font-bold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
            </div>
          ))}
          <div className="flex justify-end items-center mt-6">
            <h2 className="text-2xl font-bold">Total: ₹{total().toLocaleString('en-IN')}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom'; // Add this for navigation

function CartPage() {
  const { user } = useAuth();
  const { cart, addToCart, removeFromCart } = useCart();

  // Sample products (replace with API fetch if needed)
  const products = [
    { id: '1', name: 'Chicken Curry Cut', price: 199 },
    { id: '2', name: 'Chicken Breast - Boneless', price: 240 },
    { id: '3', name: 'Chicken Boneless - Mini Bites', price: 280 },
  ];

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-100"> // Full screen background
      <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between"> // Simple header with logo
        <Link to="/">
          <img src="/logo.png" alt="Carnivore Couture Logo" className="h-10" />
        </Link>
        <div className="text-lg font-semibold">Your Cart</div>
        {user ? (
          <span>Welcome, {user.name || user.username}</span>
        ) : (
          <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        )}
      </header>
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-md mt-6"> // Existing container with margin top
        <h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>
        {!user ? (
          <p className="text-red-500 text-center">Please log in to manage your cart.</p>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Available Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
                    <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-3">${product.price.toFixed(2)}</p>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center">Your cart is empty.</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center border-b py-3"
                    >
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-600 ml-2">
                          (${item.price.toFixed(2)} x {item.quantity})
                        </span>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="mt-6 text-xl font-bold text-right">
                    Total: ${totalPrice}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;