import { Link } from "react-router-dom";
import { LogIn, ShoppingCart } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              CARNIVORE
            </span>{" "}
            <span className="text-white">COUTURE</span>
          </h1>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-8">
          <Link
            to="/login"
            className="text-white hover:text-red-400 font-medium flex items-center gap-2 transition duration-200"
          >
            <LogIn className="w-5 h-5" />
            <span className="hidden md:inline">Log in</span>
          </Link>

          <Link to="/cart" className="relative">
            <ShoppingCart className="w-7 h-7 text-white hover:text-red-400 transition" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}