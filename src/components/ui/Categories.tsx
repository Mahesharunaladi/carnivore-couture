import { Fish } from "lucide-react";

const categories = [
  { icon: Fish, title: "FISH", count: 9 },
  { icon: Fish, title: "CHICKEN", count: 6 },
  { icon: Fish, title: "MUTTON", count: 6 },
  { icon: Fish, title: "BEEF", count: 12 },
];

export default function Categories() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-6 text-center mb-12">
        <p className="text-gray-400 text-lg">Curated selections for every carnivore</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {categories.map((cat) => (
          <div
            key={cat.title}
            className="bg-white/5 backdrop-blur-md rounded-3xl p-8 text-center hover:bg-white/10 transition-all hover:scale-105 cursor-pointer border border-white/10"
          >
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-4xl shadow-xl">
              <cat.icon className="w-10 h-10" />
            </div>
            <h3 className="text-white font-bold text-xl mb-1">{cat.title}</h3>
            <p className="text-gray-400">{cat.count} Products</p>
          </div>
        ))}
      </div>
    </section>
  );
}