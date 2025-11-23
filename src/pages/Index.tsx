import { motion } from "framer-motion";
import CategoryCard from "../components/CategoryCard";
import productMutton from "/product-mutton.jpg";
import productChicken from "/product-chicken.jpg";
import productFish from "/product-fish.jpg";
import productPrawns from "/product-prawns.jpg";

const Index = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-black text-white">


      <section className="py-12 px-4 md:px-8 bg-gray-900">
        <h2 className="text-5xl font-extrabold text-center mb-12 text-red-600 uppercase tracking-wide font-display">
          Explore Our Categories
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <CategoryCard title="Mutton" image={productMutton} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <CategoryCard title="Chicken" image={productChicken} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <CategoryCard title="Fish" image={productFish} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <CategoryCard title="Prawns" image={productPrawns} />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;