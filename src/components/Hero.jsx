import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero-section bg-gradient-dark text-white py-24 px-4">
      <div className="container mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-6xl md:text-8xl mb-4 leading-tight"
        >
          <span className="block">Carnivore</span>
          <span className="block bg-gradient-neon bg-clip-text text-transparent">Couture</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8 font-sans max-w-2xl mx-auto"
        >
          Premium meat delivery service with exciting offers just for you!
        </motion.p>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 100 }}
          className="cta-button bg-gradient-neon text-white font-bold py-3 px-8 rounded-full flex items-center justify-center mx-auto hover:scale-105 transition-transform duration-300"
        >
          Shop Now <ArrowRight className="ml-2" size={20} />
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;