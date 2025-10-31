import { ProductCard } from "../components/ProductCard"; 
import { CategoryCard } from "../components/CategoryCard"; 
import { Navbar } from "../components/Navbar"; 
import { CartDrawer } from "../components/CartDrawer"; 
import { motion } from "framer-motion"; 
import { Fish, Bird, Waves } from "lucide-react"; 
import { useState } from "react"; 
import Hero from "../components/Hero"; // Add missing top-level Hero import
import productChicken from "/product1.svg"; 
import productFish from "/product2.svg"; 
import productMutton from "/product3.svg"; 
import productWings from "/chicken.svg"; // Map to existing public SVG
import productTuna from "/fish.svg"; // Map to existing public SVG
import productPrawns from "/prawns.svg"; // Map to existing public SVG
import productMuttonCurry from "/mutton.svg"; // Map to existing public SVG
import productThighs from "/product4.svg"; // Map to existing public SVG
import productCod from "/fish1.svg"; // Map to existing public SVG

const Index = () => { 
  const [isCartOpen, setIsCartOpen] = useState(false); 
  
  const products = [ 
    // Chicken Products 
    { 
      name: "Premium Chicken Breast", 
      price: 3750, 
      originalPrice: 5200, 
      image: productChicken, 
      badge: "PREMIUM", 
    }, 
    { 
      name: "Chicken Wings", 
      price: 2800, 
      originalPrice: 3500, 
      image: productWings, 
      badge: "BESTSELLER", 
    }, 
    { 
      name: "Chicken Thighs", 
      price: 3200, 
      image: productThighs, 
    }, 
    { 
      name: "Whole Chicken", 
      price: 4500, 
      image: productChicken, 
    }, 
    { 
      name: "Chicken Drumsticks", 
      price: 2500, 
      originalPrice: 3000, 
      image: productWings, 
    }, 
    { 
      name: "Chicken Curry Cut", 
      price: 3800, 
      image: productThighs, 
      badge: "POPULAR", 
    }, 
    
    // Fish Products 
    { 
      name: "Wild Salmon Fillet", 
      price: 6500, 
      originalPrice: 7900, 
      image: productFish, 
      badge: "PREMIUM", 
    }, 
    { 
      name: "Tuna Steak", 
      price: 7800, 
      image: productTuna, 
      badge: "FRESH", 
    }, 
    { 
      name: "Tiger Prawns", 
      price: 8500, 
      originalPrice: 10000, 
      image: productPrawns, 
      badge: "BESTSELLER", 
    }, 
    { 
      name: "Cod Fish Fillet", 
      price: 5500, 
      image: productCod, 
    }, 
    { 
      name: "King Fish Steaks", 
      price: 6800, 
      image: productFish, 
    }, 
    { 
      name: "Pomfret Whole", 
      price: 7200, 
      originalPrice: 8500, 
      image: productTuna, 
      badge: "PREMIUM", 
    }, 
    { 
      name: "Sea Bass", 
      price: 8900, 
      image: productCod, 
    }, 
    { 
      name: "Mackerel", 
      price: 3500, 
      image: productFish, 
    }, 
    { 
      name: "Jumbo Prawns", 
      price: 9500, 
      originalPrice: 11000, 
      image: productPrawns, 
      badge: "LUXURY", 
    }, 
    
    // Mutton Products 
    { 
      name: "Lamb Chops", 
      price: 7400, 
      image: productMutton, 
      badge: "PREMIUM", 
    }, 
    { 
      name: "Mutton Curry Cut", 
      price: 6200, 
      originalPrice: 7500, 
      image: productMuttonCurry, 
      badge: "BESTSELLER", 
    }, 
    { 
      name: "Mutton Leg", 
      price: 8900, 
      image: productMutton, 
    }, 
    { 
      name: "Mutton Ribs", 
      price: 6800, 
      originalPrice: 8000, 
      image: productMuttonCurry, 
    }, 
    { 
      name: "Mutton Keema", 
      price: 5500, 
      image: productMuttonCurry, 
      badge: "POPULAR", 
    }, 
    { 
      name: "Mutton Shoulder", 
      price: 7200, 
      image: productMutton, 
    }, 
  ]; 
  
  const categories = [ 
    { title: "Fish", icon: Fish, count: 9 }, 
    { title: "Chicken", icon: Bird, count: 6 }, 
    { title: "Mutton", icon: Waves, count: 6 }, 
  ]; 
  
  return ( 
    <div className="min-h-screen bg-gradient-dark"> 
      {/* Navbar */} 
      <Navbar onCartClick={() => setIsCartOpen(true)} /> 
      
      {/* Cart Drawer */} 
      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} /> 
      
      {/* Hero Section */} 
      <Hero /> 
  
      {/* Categories Section */} 
      <section className="py-24 px-4"> 
        <div className="container mx-auto"> 
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }} 
            className="text-center mb-16" 
          > 
            <h2 className="font-display text-5xl md:text-6xl mb-4"> 
              EXPLORE CATEGORIES 
            </h2> 
            <p className="text-muted-foreground text-lg font-sans"> 
              Curated selections for every carnivore 
            </p> 
          </motion.div> 
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
            {categories.map((category, index) => ( 
              <CategoryCard key={category.title} {...category} index={index} /> 
            ))} 
          </div> 
        </div> 
      </section> 
  
      {/* Featured Products Section */} 
      <section className="py-24 px-4 bg-background"> 
        <div className="container mx-auto"> 
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }} 
            className="text-center mb-16" 
          > 
            <h2 className="font-display text-5xl md:text-6xl mb-4"> 
              FEATURED PRODUCTS 
            </h2> 
            <p className="text-muted-foreground text-lg font-sans"> 
              Our most popular premium selections 
            </p> 
          </motion.div> 
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto"> 
            {products.map((product, index) => ( 
              <ProductCard key={product.name} {...product} index={index} /> 
            ))} 
          </div> 
        </div> 
      </section> 
  
      {/* Stats Section */} 
      <section className="py-24 px-4"> 
        <div className="container mx-auto"> 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"> 
            {[ 
              { value: "100%", label: "Premium Quality" }, 
              { value: "24/7", label: "Customer Support" }, 
              { value: "50K+", label: "Happy Customers" }, 
            ].map((stat, index) => ( 
              <motion.div 
                key={stat.label} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6, delay: index * 0.1 }} 
                className="text-center" 
              > 
                <div className="font-display text-6xl md:text-7xl mb-2 bg-gradient-neon bg-clip-text text-transparent"> 
                  {stat.value} 
                </div> 
                <div className="text-muted-foreground text-lg font-sans"> 
                  {stat.label} 
                </div> 
              </motion.div> 
            ))} 
          </div> 
        </div> 
      </section> 
    </div> 
  ); 
}; 

export default Index;
// Remove the duplicate Hero/CategoryCard imports here (lines 257-258)