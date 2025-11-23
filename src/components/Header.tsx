import { Link } from "react-router-dom";
import { LogIn, ShoppingCart } from "lucide-react";

export default function Header({ onCartClick }: { onCartClick: () => void }) {
  return (
    <div
      className="relative h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url('/hero-meat (1).jpg')` }}
    >
      <div className="absolute inset-0 bg-black opacity-20"></div> {/* Overlay for better text readability */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center h-full">
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-white">
          CARNIVORE COUTURE
        </h1>
        <p className="text-white text-lg md:text-xl mt-2">Experience the finest selection of premium meats.</p>
        <p className="text-pink-500 text-lg md:text-xl mt-1">Bold flavors. Exceptional quality.</p>
        <div className="flex mt-6 space-x-4">
          <button className="bg-red-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-red-700 transition">
            Shop Now
          </button>
          <button className="bg-gray-800 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-700 transition">
            View Collection
          </button>
        </div>


      </div>
    </div>
  );
}