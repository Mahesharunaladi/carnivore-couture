import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import productChicken from '/product-chicken.jpg';
import productWings from '/product-wings.jpg'; // Assuming this is the path to the second image
import productThighs from '/product-thighs.jpg'; // Assuming this is the path to the third image

const ChickenPage: React.FC = () => {
  const [isZoomed1, setIsZoomed1] = useState(false);
  const [isZoomed2, setIsZoomed2] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (productName: string, image: string, price: number) => {
    addToCart({
      id: productName.toLowerCase().replace(/ /g, '-'),
      name: productName,
      image: image,
      price: price,
      quantity: 1,
    });
    alert(`${productName} added to cart!`);
  };

  const handleCheckout = () => {
    navigate('/cart'); // Assuming a cart page exists at /cart
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-5xl font-bold mb-8 font-display">Farm-Fresh Chicken</h1>
      <p className="text-lg text-center max-w-2xl mb-8">
        Enjoy our range of farm-fresh chicken, offering succulent and healthy options for your meals.
        From whole chickens to specific cuts, we ensure quality and taste in every bite.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="relative w-full p-4 bg-gray-800 rounded-lg shadow-lg">
          <motion.img
            src={productWings}
            alt="Chicken Wings"
            className="w-full h-auto rounded-lg shadow-lg cursor-pointer mb-4"
            initial={{ scale: 1 }}
            animate={{ scale: isZoomed1 ? 1.2 : 1 }}
            transition={{ duration: 0.3 }}
            onTap={() => setIsZoomed1(!isZoomed1)}
            style={{ originX: 0.5, originY: 0.5 }}
          />
          {isZoomed1 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <p className="text-white text-lg">Click to zoom out</p>
            </div>
          )}
          <h3 className="text-2xl font-bold text-white mb-2">Chicken Wings</h3>
          <p className="text-xl text-red-500 mb-4">$12.99</p>
          <motion.button
            className="bg-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAddToCart("Chicken Wings", productWings, 12.99)}
          >
            Add to Cart
          </motion.button>
        </div>
        <div className="relative w-full p-4 bg-gray-800 rounded-lg shadow-lg">
          <motion.img
            src={productThighs}
            alt="Chicken Thighs"
            className="w-full h-auto rounded-lg shadow-lg cursor-pointer mb-4"
            initial={{ scale: 1 }}
            animate={{ scale: isZoomed2 ? 1.2 : 1 }}
            transition={{ duration: 0.3 }}
            onTap={() => setIsZoomed2(!isZoomed2)}
            style={{ originX: 0.5, originY: 0.5 }}
          />
          {isZoomed2 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <p className="text-white text-lg">Click to zoom out</p>
            </div>
          )}
          <h3 className="text-2xl font-bold text-white mb-2">Chicken Thighs</h3>
          <p className="text-xl text-red-500 mb-4">$15.99</p>
          <motion.button
            className="bg-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAddToCart("Chicken Thighs", productThighs, 15.99)}
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
      <motion.button
        className="mt-12 bg-green-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-green-700 transition-colors duration-300 shadow-lg"
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34, 197, 94, 0.6)" }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCheckout}
      >
        Proceed to Checkout
      </motion.button>
    </div>
  );
};

export default ChickenPage;