import React from 'react';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';

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
    <div className="card product-card">
      <div className="card-image-container">
        <img 
          src={`/public/${product.image}.svg`} 
          alt={product.name} 
          className="product-image"
        />
        <button 
          className={`wishlist-btn ${isWishlist ? 'active' : ''}`}
          onClick={toggleWishlist}
        >
          <FiHeart />
        </button>
        {product.discount && (
          <span className="discount-badge">{product.discount}</span>
        )}
      </div>
      
      <div className="card-content">
        <h3 className="product-name">{product.name}</h3>
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
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
          >
            <FiShoppingCart /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
