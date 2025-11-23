import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// @ts-ignore
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total: number, item: any) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 w-full md:w-96 h-full bg-gray-800 shadow-lg z-50 flex flex-col"
        >
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Your Cart</h2>
            <button onClick={onClose} className="text-white text-2xl">
              &times;
            </button>
          </div>
          <div className="flex-grow p-4 overflow-y-auto">
            {cart.length === 0 ? (
              <p className="text-white text-center">Your cart is empty.</p>
            ) : (
              cart.map((item: any) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center mb-4 p-2 bg-gray-700 rounded-lg"
                >
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                    <p className="text-gray-300">${item.price.toFixed(2)} x {item.quantity}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </motion.div>
              ))
            )}
          </div>
          <div className="p-4 border-t border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold text-white">Total:</span>
              <span className="text-xl font-bold text-white">${calculateTotal()}</span>
            </div>
            <button className="w-full bg-green-600 text-white py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
