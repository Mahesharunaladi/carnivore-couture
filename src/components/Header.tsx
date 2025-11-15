import { Link } from "react-router-dom";
import { LogIn, ShoppingCart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] bg-black/95 backdrop-blur-lg px-6 py-4 flex justify-between items-center border-b border-white/30 shadow-lg">
      <Link to="/" className="flex items-center">
        <h1 className="text-2xl md:text-3xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
            CARNIVORE
          </span>{" "}
          <span className="text-white">COUTURE</span>
        </h1>
      </Link>

      <div className="flex items-center gap-6">
        {user ? (
          <button
            onClick={logout}
            className="text-white hover:text-red-400 font-medium flex items-center gap-2 transition"
          >
            <LogIn className="w-5 h-5" />
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="text-white hover:text-red-400 font-medium flex items-center gap-2 transition"
          >
            <LogIn className="w-5 h-5" />
            Log in
          </Link>
        )}

        <Link to="/cart" className="relative">
          <ShoppingCart className="w-8 h-8 text-white hover:text-red-400 transition" />
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
            0
          </span>
        </Link>
      </div>
    </header>
  );
}