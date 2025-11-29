import { motion } from "framer-motion";

const ProductCard = ({ product, index }) => {
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
            e.target.src = "/hero-meat.jpg";
          }}
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price">₹{product.price.toLocaleString()}</div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
