import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { Button } from "./ui/button";

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="fixed inset-x-0 top-0 z-50 bg-background/80 shadow-sm"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="text-2xl font-bold text-white">CARNIVORE COUTURE</Link>
        <div className="flex items-center space-x-4">
          <Link to="/about-us" className="text-white hover:text-red-400 transition">About Us</Link>
          <Link to="/login" className="text-white hover:text-red-400 transition">
            <Button variant="ghost" size="icon">
              <User className="h-6 w-6" />
            </Button>
          </Link>

        </div>
      </div>
    </motion.nav>
  );
};
