// src/pages/Home.tsx
import Header from "@/components/Header";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <Header />

      {/* HERO WITH PROPER SPACING */}
      <div className="pt-20 lg:pt-24">
        <Hero />
      </div>

      {/* SHOP BY CATEGORY — WITHOUT IMPORT ERROR */}
      <section className="py-20 px-6 md:px-12 lg:px-32">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight">
          Shop by Category
        </h2>

        {/* GRID OF CATEGORIES */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
          {["Beef", "Lamb", "Poultry", "Seafood", "Exotic"].map((category) => (
            <div
              key={category}
              className="group cursor-pointer transition-all duration-300 hover:scale-105"
            >
              <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-red-900/20 transition-all">
                <div className="h-48 bg-gradient-to-br from-red-900/50 to-black flex items-center justify-center">
                  <span className="text-5xl">{getIcon(category)}</span>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-white group-hover:text-red-400 transition">
                    {category}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="py-20 bg-zinc-900/50">
        <div className="text-center px-6">
          <h2 className="text-5xl font-bold mb-6">Premium Quality. Every Time.</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Grass-fed beef • Wild-caught fish • Free-range chicken • Delivered fresh in 24 hours
          </p>
        </div>
      </section>
    </div>
  );
}

// Simple icon helper
function getIcon(category: string) {
  const icons: Record<string, string> = {
    Beef: "Steak",
    Lamb: "Lamb",
    Poultry: "Chicken",
    Seafood: "Fish",
    Exotic: "Deer",
  };
  return icons[category] || "Meat";
}