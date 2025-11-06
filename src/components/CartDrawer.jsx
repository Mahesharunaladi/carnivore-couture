import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { Minus, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export const CartDrawer = ({ open, onClose }) => {
  const { items = [], updateQuantity, removeItem, clearCart, total = 0 } = useCart();

  // Ensure items is an array and total is a number, providing default values if useCart returns undefined
  const cartItems = items || [];
  const cartTotal = total || 0;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-display text-3xl">YOUR CART</SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex flex-col h-[calc(100vh-200px)]">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground text-lg">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id ?? index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 bg-card border border-border rounded-lg p-4"
                  >
                    <img
                      src={item.image ?? ""}
                      alt={item.name ?? "Product"}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-display text-lg mb-1">{item.name ?? "Unnamed"}</h3>
                      <p className="text-primary font-bold">
                        ₹{(item.price ?? 0).toLocaleString('en-IN')}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => item.quantity > 1 && updateQuantity?.(item.id, item.quantity - 1)} // Added optional chaining
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-bold w-8 text-center">{item.quantity ?? 1}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => updateQuantity?.(item.id, (item.quantity ?? 1) + 1)} // Added optional chaining
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 ml-auto text-destructive"
                          onClick={() => removeItem?.(item.id)} // Added optional chaining
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-border pt-4 mt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-display text-2xl">TOTAL</span>
                  <span className="font-display text-3xl text-primary">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <Button className="w-full" size="lg">
                  CHECKOUT
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
