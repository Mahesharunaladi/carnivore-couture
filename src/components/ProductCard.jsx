import { motion } from 'framer-motion';
import { FiShoppingCart } from 'react-icons/fi';

const ProductCard = ({ product, index, onAddToCart }) => {
  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="product-image-container">
        <img
          src={`/product-${product.image}.jpg`}
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.target.src = "/hero-meat (1).jpg";
          }}
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price">₹{product.price.toLocaleString()}</div>
        <motion.button
          className="add-to-cart-btn"
          onClick={() => onAddToCart(product)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiShoppingCart size={18} />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
