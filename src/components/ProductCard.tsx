import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
// @ts-ignore
import { useAuth } from '@/context/AuthContext';
import { useCart, CartStore } from '@/hooks/useCart';
import { toast } from "sonner";

interface ProductCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  originalPrice,
  image,
  badge,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const addToCart = useCart((state: CartStore) => state.addToCart);
  const { user } = useAuth();

  const handleAddToCart = () => {
    console.log('Add to cart button clicked!');
    console.log('Auth Token:', user?.token);
    addToCart(
      {
        id: String(index),
        name,
        price,
        image,
      },
      user?.token || '',
    );
    toast.success('Added to cart!');
  };

  console.log('ProductCard rendering, handleAddToCart defined:', !!handleAddToCart);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative h-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out bg-gray-800"
    >
      <div className="relative w-full h-64 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
        {badge && (
          <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            {badge}
          </div>
        )}
      </div>

      <div className="p-4 flex-grow flex flex-col justify-between">
        <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors duration-300">
          {name}
        </h3>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="font-sans text-2xl font-bold text-red-500">
              ₹{price.toLocaleString('en-IN')}
            </span>
            {originalPrice && (
              <span className="text-gray-400 line-through text-base">
                ₹{originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white rounded-full px-4 py-2 shadow-lg transform transition-transform duration-200 ease-in-out hover:scale-105"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};