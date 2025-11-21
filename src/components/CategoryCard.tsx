import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  icon: LucideIcon | string;
  count: number;
  index: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ title, icon, count, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(230, 57, 70, 0.3)" }}
      className="relative bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 ease-in-out group"
    >
      <div className="relative w-full h-48 sm:h-56 lg:h-64 overflow-hidden">
        <img
          src={icon as string}
          alt={title}
          className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
        <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          {title.toUpperCase()}
        </div>
      </div>
      <div className="p-6 text-center">
        <h3 className="font-display text-3xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-400 text-lg font-sans">
          {count} Products
        </p>
      </div>
    </motion.div>
  );
};
