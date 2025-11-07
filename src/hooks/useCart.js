import { create } from 'zustand';

export const useCart = create((set, get) => ({
  items: [],
  addToCart: (product) =>
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
        return {
          items: [...state.items, { ...product, quantity: 1 }],
        };
      }
    }),
  updateQuantity: (id, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return { items: state.items.filter((item) => item.id !== id) };
      }
      return {
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  clearCart: () => set({ items: [] }),
  get itemCount() {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
  get total() {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
}));