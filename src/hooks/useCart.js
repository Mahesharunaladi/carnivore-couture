import { create } from 'zustand';

export const useCart = create((set) => ({
  items: [],
  itemCount: 0,
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
          itemCount: state.itemCount + 1,
        };
      } else {
        return {
          items: [...state.items, { ...product, quantity: 1 }],
          itemCount: state.itemCount + 1,
        };
      }
    }),
  removeFromCart: (productId) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === productId);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          return {
            items: state.items.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
            itemCount: state.itemCount - 1,
          };
        } else {
          return {
            items: state.items.filter((item) => item.id !== productId),
            itemCount: state.itemCount - 1,
          };
        }
      }
      return state; // Should not happen if UI is correct
    }),
  clearCart: () => set({ items: [], itemCount: 0 }),
}));