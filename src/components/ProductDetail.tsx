import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ProductDetailProps {
  image: string;
  title: string;
  description: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ image, title, description }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="flex flex-col items-center p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-5xl font-bold mb-8 font-display">{title}</h1>
      <div className="relative w-full max-w-2xl mb-8">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-auto rounded-lg shadow-lg cursor-pointer"
          initial={{ scale: 1 }}
          animate={{ scale: isZoomed ? 1.5 : 1 }}
          transition={{ duration: 0.3 }}
          onTap={() => setIsZoomed(!isZoomed)}
          style={{ originX: 0.5, originY: 0.5 }}
        />
        {isZoomed && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
            <p className="text-white text-lg">Click to zoom out</p>
          </div>
        )}
      </div>
      <p className="text-lg text-center max-w-2xl">{description}</p>
    </div>
  );
};

export default ProductDetail;