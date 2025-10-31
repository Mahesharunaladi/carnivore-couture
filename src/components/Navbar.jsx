import { ShoppingCart } from "lucide-react"; 
 import { Button } from "./ui/button"; 
 import { useCart } from "../hooks/useCart"; 
 import { motion } from "framer-motion"; 
 
 interface NavbarProps { 
   onCartClick: () => void; 
 } 
 
 export const Navbar = ({ onCartClick }: NavbarProps) => { 
   const items = useCart((state) => state.items); 
   const itemCount = items.reduce((sum, item) => sum + item.quantity, 0); 
 
   return ( 
     <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"> 
       <div className="container mx-auto px-4 py-4 flex items-center justify-between"> 
         <motion.div 
           initial={{ opacity: 0, x: -20 }} 
           animate={{ opacity: 1, x: 0 }} 
           className="font-display text-3xl" 
         > 
           CARNIVORE COUTURE 
         </motion.div> 
         
         <motion.div 
           initial={{ opacity: 0, x: 20 }} 
           animate={{ opacity: 1, x: 0 }} 
         > 
           <Button 
             onClick={onCartClick} 
             variant="outline" 
             size="lg" 
             className="relative" 
           > 
             <ShoppingCart className="w-5 h-5" /> 
             {itemCount > 0 && ( 
               <motion.span 
                 initial={{ scale: 0 }} 
                 animate={{ scale: 1 }} 
                 className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold" 
               > 
                 {itemCount} 
               </motion.span> 
             )} 
           </Button> 
         </motion.div> 
       </div> 
     </nav> 
   ); 
 };