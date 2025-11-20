import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  icon: LucideIcon | string;
  count: number;
  index: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ title, icon, count, index }) => {
  const IconComponent = typeof icon === 'string' ? null : icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-card border border-border rounded-lg shadow-md p-6 cursor-pointer group flex flex-col justify-between min-h-[200px]"
    >
      <motion.div
        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
        className="inline-block mb-4"
      >
        <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow group-hover:shadow-neon transition-shadow">
          {IconComponent ? (
            <IconComponent className="w-8 h-8 text-primary-foreground" />
          ) : (
            <img src={icon as string} alt={title} className="w-8 h-8 object-cover rounded-full" />
          )}
        </div>
      </motion.div>
      
      <h3 className="font-display text-2xl mb-2">{title}</h3>
      <p className="text-muted-foreground font-sans">
        {count} Products
      </p>
    </motion.div>
  );
};
