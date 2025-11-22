import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import heroMeat from '/hero-meat (1).jpg';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroMeat})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y,
        }}
      />
      <div className="absolute inset-0 z-0 overflow-hidden animated-background">
        {/* Placeholder for animated SVG/Lottie background */}
      </div>
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          Carnivore Couture
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Premium Meats for the Discerning Palate
        </p>
        <div className="flex space-x-4">
          <motion.button
            className="bg-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors duration-300"
            whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(0, 255, 255, 0.7)" }}
            whileTap={{ scale: 0.9 }}
          >
            Shop Now
          </motion.button>
          <motion.button
            className="bg-gray-800 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition-colors duration-300"
            whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(0, 255, 255, 0.7)" }}
            whileTap={{ scale: 0.9 }}
          >
            View Collection
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;