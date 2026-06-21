// src/features/cart/cart.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types';

type CartStore = {
  items:        CartItem[];
  addItem:      (item: CartItem) => void;
  removeItem:   (productId: number, size?: string) => void;
  updateQty:    (productId: number, size: string | undefined, quantity: number) => void;
  clearCart:    () => void;
  totalItems:   () => number;
  totalPrice:   () => number;
};

// Chave única por produto + tamanho
const itemKey = (productId: number, size?: string) =>
  size ? `${productId}-${size}` : String(productId);

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem(item) {
        set((state) => {
          const key      = itemKey(item.productId, item.size ?? undefined);
          const existing = state.items.find(
            i => itemKey(i.productId, i.size ?? undefined) === key,
          );

          if (existing) {
            return {
              items: state.items.map(i =>
                itemKey(i.productId, i.size ?? undefined) === key
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            };
          }

          return { items: [...state.items, item] };
        });
      },

      removeItem(productId, size) {
        const key = itemKey(productId, size);
        set(state => ({
          items: state.items.filter(
            i => itemKey(i.productId, i.size ?? undefined) !== key,
          ),
        }));
      },

      updateQty(productId, size, quantity) {
        const key = itemKey(productId, size);
        if (quantity <= 0) {
          get().removeItem(productId, size);
          return;
        }
        set(state => ({
          items: state.items.map(i =>
            itemKey(i.productId, i.size ?? undefined) === key
              ? { ...i, quantity }
              : i,
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: 'commerce-cart', // chave no localStorage
    },
  ),
);