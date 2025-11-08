import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export const CategoryCard = ({ title, icon: Icon, count, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-card border border-border rounded-lg p-6 cursor-pointer group"
    >
      <motion.div
        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
        className="inline-block mb-4"
      >
        <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow group-hover:shadow-neon transition-shadow">
          <Icon className="w-8 h-8 text-primary-foreground" />
        </div>
      </motion.div>
      
      <h3 className="font-display text-2xl mb-2">{title}</h3>
      <p className="text-muted-foreground font-sans">
        {count} Products
      </p>
    </motion.div>
  );
};
