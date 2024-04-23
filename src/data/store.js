import { create } from 'zustand';

const useStore = create((set) => ({
  products: [],

  setProducts: (newProducts) => set({ products: newProducts }),

  addProducts: (newProducts) => set((state) => ({ products: [...state.products, newProducts] })),
}));

export { useStore };
