import React from 'react';
import ProductDetail from '../components/ProductDetail';
import productMutton from '/product-mutton.jpg';

const MuttonPage: React.FC = () => {
  return (
    <ProductDetail
      image={productMutton}
      title="Premium Mutton Cuts"
      description="Discover our selection of premium mutton cuts, perfect for any culinary creation. Sourced from the finest farms, our mutton is tender, flavorful, and guaranteed to elevate your dishes."
    />
  );
};

export default MuttonPage;