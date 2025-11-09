import { StoreApi, UseBoundStore } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartState {
  items: CartItem[];
  cartError: string | null;
}

interface CartActions {
  fetchCart: (token: string) => Promise<void>;
  addToCart: (product: Omit<CartItem, 'quantity'>, token: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number, token: string) => Promise<void>;
  removeItem: (id: string, token: string) => Promise<void>;
  clearCart: (token: string) => Promise<void>;
  itemCount: () => number;
  total: () => number;
}

type CartStore = CartState & CartActions;

export const useCart: UseBoundStore<StoreApi<CartStore>>;

export { CartItem, CartStore };