import { motion } from "framer-motion";

interface CategoryCardProps {
  title: string;
  image: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, image }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-full h-64 bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-300"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
        <h3 className="text-3xl font-bold text-white uppercase">{title}</h3>
      </div>
    </motion.div>
  );
};

export default CategoryCard;