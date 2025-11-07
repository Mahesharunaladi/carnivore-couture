import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { CategoryCard } from "@/components/CategoryCard";
import { Navbar } from "@/components/Navbar";
import { CartDrawer } from "@/components/CartDrawer";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "../hooks/useCart";
import NewLogo from "./NewLogo";

export const Navbar = ({ onCartClick }) => {
  const { itemCount } = useCart();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="fixed inset-x-0 top-0 z-50 bg-background/80 backdrop-blur-md shadow-sm"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <NewLogo />
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            className="relative"
            size="icon"
            onClick={onCartClick}
          >
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};
