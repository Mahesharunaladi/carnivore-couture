import { motion } from "framer-motion";

const CategoryCard = ({ category, image }) => {
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center w-full h-64 bg-cover bg-center rounded-lg shadow-lg overflow-hidden cursor-pointer"
      style={{ backgroundImage: `url(${image})` }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <motion.h3
        className="relative z-10 text-white text-3xl font-bold text-center drop-shadow-md"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {category}
      </motion.h3>
    </motion.div>
  );
};

export default CategoryCard;