import { motion } from "framer-motion";

interface CategoryCardProps {
  title: string;
  image: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, image }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 10 }}
      whileTap={{ scale: 0.95, rotateY: -10 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="relative w-full h-64 bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer"
    >
      <motion.img
        src={image}
        alt={title}
        className="w-full h-full object-cover opacity-70 transition-opacity duration-300"
        whileHover={{ scale: 1.1, rotate: 2, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
        <h3 className="text-3xl font-bold text-white uppercase">{title}</h3>
      </div>
    </motion.div>
  );
};

export default CategoryCard;