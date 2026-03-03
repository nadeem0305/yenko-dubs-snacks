import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string | number
  name: string
  price: number
  image_url: string
  quantity: number
}

interface CartState {
  items: CartItem[]
  addItem: (product: {
    id: string | number
    name: string
    price: number
    image_url: string
  }) => void
  removeItem: (name: string) => void
  clearCart: () => void
  deleteItem: (name: string) => void
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.name === product.name,
          )

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.name === product.name
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            }
          }

          return { items: [...state.items, { ...product, quantity: 1 }] }
        }),

      removeItem: (name) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.name === name)

          if (existingItem && existingItem.quantity > 1) {
            // If more than 1, just decrease quantity
            return {
              items: state.items.map((item) =>
                item.name === name
                  ? { ...item, quantity: item.quantity - 1 }
                  : item,
              ),
            }
          }
          // If only 1 left, remove the item from the array
          return {
            items: state.items.filter((item) => item.name !== name),
          }
        }),

      clearCart: () => set({ items: [] }),

      deleteItem: (name) =>
        set((state) => ({
          items: state.items.filter((item) => item.name !== name),
        })),
    }),
    { name: 'snack-storage' },
  ),
)
