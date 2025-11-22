import React from 'react';
import ProductDetail from '../components/ProductDetail';
import productFish from '/product-fish.jpg';

const FishPage: React.FC = () => {
  return (
    <ProductDetail
      image={productFish}
      title="Finest Seafood Selection"
      description="Dive into our exquisite selection of fresh fish and seafood. Sustainably sourced and delivered with care, our fish promises a delightful and healthy dining experience."
    />
  );
};

export default FishPage;