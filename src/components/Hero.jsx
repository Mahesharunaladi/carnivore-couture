import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-meat.jpg";

export const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />
        <img
          src={heroImage}
          alt="Premium meat selection"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 container mx-auto px-4 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-display text-7xl md:text-9xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              CARNIVORE
            </span>
            <br />
            <span className="text-foreground">COUTURE</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto font-sans"
        >
          Experience the finest selection of premium meats.
          <br />
          <span className="text-secondary font-semibold">Bold flavors. Exceptional quality.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button size="lg" className="group text-lg px-8 py-6 shadow-glow hover:shadow-neon">
            Shop Now
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6">
            View Collection
          </Button>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-foreground/50 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
