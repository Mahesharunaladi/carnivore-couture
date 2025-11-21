import { motion } from "framer-motion";
import heroMeat from "/public/hero-meat (1).jpg";

const Hero = () => {
  return (
    <div className="relative h-[80vh] flex items-center justify-center text-white">
      <img
        src={heroMeat}
        alt="Carnivore Couture Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-extrabold uppercase tracking-widest mb-4"
        >
          Carnivore Couture
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-2xl mb-8"
        >
          Experience the finest selection of premium meats.
          <br />
          <span className="text-red-500 font-semibold">Bold flavors. Exceptional quality.</span>
        </motion.p>
        <div className="flex justify-center space-x-4">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg"
          >
            Shop Now
          </motion.button>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-transparent border-2 border-white hover:bg-white hover:text-black font-bold py-3 px-8 rounded-full text-lg"
          >
            View Collection
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Hero;