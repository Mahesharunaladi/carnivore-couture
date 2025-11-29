import React from 'react';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const [isWishlist, setIsWishlist] = React.useState(false);

  const handleAddToCart = () => {
    addItem(product);
  };

  const toggleWishlist = () => {
    setIsWishlist(!isWishlist);
  };

  return (
    <motion.div
      className="card product-card"
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <div className="card-image-container">
        <motion.img
          src={`/public/${product.image}.svg`}
          alt={product.name}
          className="product-image"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
        />
        <motion.button
          className={`wishlist-btn ${isWishlist ? 'active' : ''}`}
          onClick={toggleWishlist}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          animate={isWishlist ? { rotate: 360 } : {}}
          transition={{ duration: 0.3 }}
        >
          <FiHeart />
        </motion.button>
        {product.discount && (
          <motion.span
            className="discount-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            {product.discount}
          </motion.span>
        )}
      </div>

      <div className="card-content">
        <motion.h3
          className="product-name"
          whileHover={{ color: "#d11243" }}
        >
          {product.name}
        </motion.h3>
        <div className="weight-time">
          <span className="weight">{product.weight}</span>
          <span className="delivery-time">{product.deliveryTime}</span>
        </div>

        <div className="price-container">
          <div className="prices">
            <span className="discounted-price">₹{product.discountedPrice}</span>
            {product.originalPrice && (
              <span className="original-price">₹{product.originalPrice}</span>
            )}
          </div>
          <motion.button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(209, 18, 67, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            animate={{ boxShadow: ["0 0 0 rgba(209, 18, 67, 0)", "0 0 10px rgba(209, 18, 67, 0.3)", "0 0 0 rgba(209, 18, 67, 0)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FiShoppingCart /> Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
