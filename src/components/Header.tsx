import { Link } from "react-router-dom";
import { LogIn, ShoppingCart } from "lucide-react";

export default function Header() {
  return (
    <div
      className="relative h-64 bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url('/header-meat.jpg')` }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div> {/* Overlay for better text readability */}
      <div className="relative z-10 w-full flex justify-between items-center px-6 py-5">
        {/* Logo - now part of the main title */}
        <Link to="/" className="flex items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-red-600">
            CARNIVORE COUTURE
          </h1>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-8">
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-7 h-7 text-white hover:text-red-400 transition" />
          </Link>
        </div>
      </div>
    </div>
  );
}