import React from 'react';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const [isWishlist, setIsWishlist] = React.useState(false);
  const [animatedPrice, setAnimatedPrice] = React.useState(product.discountedPrice);

  const cardRef = React.useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleAddToCart = () => {
    addItem(product);
    // Animate price burst effect
    setAnimatedPrice(product.discountedPrice + 10);
    setTimeout(() => setAnimatedPrice(product.discountedPrice), 300);
  };

  const toggleWishlist = () => {
    setIsWishlist(!isWishlist);
  };

  return (
    <motion.div
      ref={cardRef}
      className="card product-card"
      style={{ rotateX, rotateY }}
      whileHover={{
        y: -15,
        scale: 1.05,
        boxShadow: "0 25px 50px rgba(0,0,0,0.25)"
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, y: 50, rotateX: 15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-image-container">
        <motion.img
          src={`/public/${product.image}.svg`}
          alt={product.name}
          className="product-image"
          animate={{
            scale: [1, 1.08, 1],
            filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{
            scale: 1.15,
            rotate: [0, -3, 3, 0],
            filter: "hue-rotate(15deg) brightness(1.2)"
          }}
        />
        <motion.button
          className={`wishlist-btn ${isWishlist ? 'active' : ''}`}
          onClick={toggleWishlist}
          whileHover={{ scale: 1.3, rotate: 180 }}
          whileTap={{ scale: 0.8 }}
          animate={isWishlist ? {
            rotate: 360,
            scale: [1, 1.2, 1],
            boxShadow: "0 0 20px rgba(255, 107, 107, 0.8)"
          } : {}}
          transition={{ duration: 0.5 }}
        >
          <FiHeart />
        </motion.button>
        {product.discount && (
          <motion.span
            className="discount-badge"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            whileHover={{
              scale: 1.2,
              backgroundColor: "#ff4757",
              boxShadow: "0 0 15px rgba(255, 71, 87, 0.6)"
            }}
          >
            {product.discount}
          </motion.span>
        )}

        {/* Animated price burst effect */}
        <motion.div
          className="price-burst"
          animate={{
            scale: animatedPrice > product.discountedPrice ? [0, 1.5, 0] : 0,
            opacity: animatedPrice > product.discountedPrice ? [0, 1, 0] : 0
          }}
          transition={{ duration: 0.3 }}
        >
          💰
        </motion.div>
      </div>

      <div className="card-content">
        <motion.h3
          className="product-name"
          whileHover={{
            color: "#ff6b6b",
            scale: 1.02,
            textShadow: "0 0 8px rgba(255, 107, 107, 0.5)"
          }}
        >
          {product.name}
        </motion.h3>
        <div className="weight-time">
          <span className="weight">{product.weight}</span>
          <span className="delivery-time">{product.deliveryTime}</span>
        </div>

        <div className="price-container">
          <div className="prices">
            <motion.span
              className="original-price"
              animate={{ x: [0, -2, 2, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              ₹{product.originalPrice}
            </motion.span>
            <motion.span
              className="discounted-price"
              animate={{
                scale: [1, 1.1, 1],
                color: ["#d11243", "#ff4757", "#d11243"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ₹{animatedPrice}
            </motion.span>
          </div>
          <motion.button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 25px rgba(209, 18, 67, 0.6)",
              backgroundColor: "#ff4757"
            }}
            whileTap={{ scale: 0.9 }}
            animate={{
              boxShadow: [
                "0 0 0 rgba(209, 18, 67, 0)",
                "0 0 15px rgba(209, 18, 67, 0.4)",
                "0 0 0 rgba(209, 18, 67, 0)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FiShoppingCart />
            </motion.span>
            <span>Add</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;