import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCart = create(persist(
  (set, get) => ({
    items: [],
    addItem: (product) => {
      set((state) => {
        const existingItem = state.items.find((item) => item.id === product.id);
        if (existingItem) {
          return {
            items: state.items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        } else {
          return { items: [...state.items, { ...product, quantity: 1 }] };
        }
      });
    },
    updateQuantity: (id, quantity) => {
      set((state) => ({
        items: state.items
          .map((item) => (item.id === id ? { ...item, quantity } : item))
          .filter((item) => item.quantity > 0),
      }));
    },
    removeItem: (id) => {
      set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      }));
    },
    clearCart: () => set({ items: [] }),
    get total() {
      return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
  }),
  {
    name: 'cart-storage',
    getStorage: () => localStorage,
  }
));