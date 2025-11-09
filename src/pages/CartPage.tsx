
import React from 'react';
import { useCart } from '../hooks/useCart';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

const CartPage: React.FC = () => {
  const { items, total } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {items.map((item: CartItem) => (
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