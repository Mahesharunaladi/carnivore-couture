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
      className="group relative h-full"
    >
      <div className="relative bg-card rounded-lg overflow-hidden border border-border flex flex-col h-full">
        {/* Badge */}
        {badge && (
          <div className="absolute top-4 right-4 z-10 bg-gradient-neon text-foreground px-3 py-1 rounded-full text-sm font-bold shadow-neon">
            {badge}
          </div>
        )}

        {/* Image Container */}
        <motion.div
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative aspect-square overflow-hidden bg-black"
        >
          <motion.img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Animated Glow Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-primary opacity-0 mix-blend-overlay"
            animate={isHovered ? { opacity: 0.3 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Pulse Effect */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 border-4 border-primary rounded-lg"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1.05, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.div>

        {/* Content */}
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="font-display text-2xl mb-2">{name}</h3>
          
          {/* Animated Price */}
          <div className="flex items-center gap-3 mb-4 mt-auto">
            <motion.span
              className="font-sans text-3xl font-bold text-primary"
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              ₹{price.toLocaleString('en-IN')}
            </motion.span>
            {originalPrice && (
              <span className="text-muted-foreground line-through text-lg">
                ₹{originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <Button className="w-full shadow-glow hover:shadow-neon" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};