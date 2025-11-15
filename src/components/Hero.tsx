import { ChevronRight, LogIn } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-meat.jpg";
import { useAuth } from "@/context/AuthContext";

export const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const { user, logout } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90 z-10" />
        <img
          src={heroImage}
          alt="Premium meat selection"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* FIXED HEADER — NOW ON TOP */}
      <header className="absolute top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center bg-black/40 backdrop-blur-md border-b border-white/10">
        <h1 className="font-display text-2xl md:text-3xl font-bold tracking-wider">
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            CARNIVORE
          </span>{" "}
          <span className="text-white">COUTURE</span>
        </h1>

        <div className="flex items-center gap-6">
          {/* LOGIN / LOGOUT BUTTON — NOW VISIBLE */}
          {user ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-white hover:text-red-400 transition flex items-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-red-400 transition flex items-center gap-2 font-medium"
              >
                <LogIn className="w-5 h-5" />
                Log in
              </Button>
            </Link>
          )}

          {/* CART */}
          <Link to="/cart" className="relative">
            <div className="text-white text-3xl hover:text-red-400 transition">
              Cart
            </div>
            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
              0
            </span>
          </Link>
        </div>
      </header>

      {/* HERO CONTENT */}
      <motion.div style={{ opacity }} className="relative z-20 container mx-auto px-4 text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-display text-7xl md:text-9xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              CARNIVORE
            </span>
            <br />
            <span className="text-white">COUTURE</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto"
        >
          Experience the finest selection of premium meats.
          <br />
          <span className="text-orange-400 font-bold">Bold flavors. Exceptional quality.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Button size="lg" className="text-lg px-10 py-7 bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-red-600/50">
            Shop Now
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition" />
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-10 py-7 border-white/50 text-white hover:bg-white/10">
            View Collection
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};