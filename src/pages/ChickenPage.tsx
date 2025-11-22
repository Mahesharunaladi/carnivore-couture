import React from 'react';
import ProductDetail from '../components/ProductDetail';
import productChicken from '/product-chicken.jpg';

const ChickenPage: React.FC = () => {
  return (
    <ProductDetail
      image={productChicken}
      title="Farm-Fresh Chicken"
      description="Enjoy our range of farm-fresh chicken, offering succulent and healthy options for your meals. From whole chickens to specific cuts, we ensure quality and taste in every bite."
    />
  );
};

export default ChickenPage;