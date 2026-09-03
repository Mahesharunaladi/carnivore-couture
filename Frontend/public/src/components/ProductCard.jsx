import React, { useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    console.log('Adding to cart:', product);
    addItem(product);
    setIsAdded(true);
    
    // Reset the added state after animation
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <motion.div
      style={{
        background: 'rgba(20, 20, 20, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        y: -10,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)"
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container */}
      <div 
        style={{
          position: 'relative',
          overflow: 'hidden',
          height: '280px'
        }}
      >
        <motion.img
          src={`/product-${product.image}.jpg`}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Badge - Top Right */}
        {product.badge && (
          <motion.div 
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background: product.badge === 'PREMIUM' 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : product.badge === 'BESTSELLER'
                ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                : product.badge === 'POPULAR'
                ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                : 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              color: 'white',
              padding: '0.4rem 0.9rem',
              borderRadius: '20px',
              fontWeight: '700',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
            }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {product.badge}
          </motion.div>
        )}

        {/* Hover Overlay with Add to Cart */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
            >
              <motion.button
                onClick={handleAddToCart}
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0, y: 20 }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 10px 30px rgba(220, 38, 38, 0.6)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: isAdded 
                    ? 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)'
                    : 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                  border: 'none',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: '700',
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: isAdded
                    ? '0 4px 15px rgba(22, 163, 74, 0.4)'
                    : '0 4px 15px rgba(220, 38, 38, 0.4)',
                  transition: 'all 0.3s ease'
                }}
              >
                <FiShoppingCart size={20} /> 
                {isAdded ? '✓ Added!' : 'Add to Cart'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Added to Cart Notification */}
        <AnimatePresence>
          {isAdded && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '15px',
                fontWeight: '700',
                fontSize: '1.1rem',
                boxShadow: '0 10px 30px rgba(22, 163, 74, 0.5)',
                zIndex: 20,
                pointerEvents: 'none'
              }}
            >
              ✓ Added to Cart!
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content Section */}
      <div style={{ padding: '1.25rem' }}>
        <h3 
          style={{
            fontSize: '1.1rem',
            fontWeight: '700',
            color: 'white',
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            minHeight: '2.5rem',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {product.name}
        </h3>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          {product.originalPrice && (
            <span 
              style={{
                textDecoration: 'line-through',
                color: 'rgba(255, 255, 255, 0.4)',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              ₹{product.originalPrice}
            </span>
          )}
          <span 
            style={{
              fontSize: '1.5rem',
              fontWeight: '900',
              color: '#dc2626',
              fontFamily: 'inherit'
            }}
          >
            ₹{product.discountedPrice}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
