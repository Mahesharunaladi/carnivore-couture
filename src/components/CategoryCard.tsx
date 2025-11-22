import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

interface CategoryCardProps {
  title: string;
  image: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${title.toLowerCase()}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 10 }}
      whileTap={{ scale: 0.95, rotateY: -10 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="relative w-full h-64 bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer"
      onClick={handleClick}
    >
      <motion.img
        src={image}
        alt={title}
        className="w-full h-full object-cover opacity-70 transition-opacity duration-300"
        whileHover={{ scale: 1.1, rotate: 2, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        initial={{ scale: 1, rotate: 0, opacity: 0.7 }}
        animate={{ scale: 1, rotate: 0, opacity: 0.7 }}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
        <motion.h3
          className="text-3xl font-bold text-white uppercase"
          whileHover={{ scale: 1.1, color: "#dc2626" }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {title}
        </motion.h3>
      </div>
    </motion.div>
  );
};

export default CategoryCard;