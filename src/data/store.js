import { create } from 'zustand';
import { deleteDoc, doc } from 'firebase/firestore/lite'; // Import deleteDoc and doc from Firestore
import { db } from '../data/fire.js';

const useStore = create((set) => ({
  products: [],

  setProducts: (newProducts) => set({ products: newProducts }),

  addProduct: (newProduct) => set((state) => ({ products: [...state.products, newProduct] })),

  removeProduct: async (productId) => {
    // Remove the product from the local state
    set((state) => ({
      products: state.products.filter(product => product.id !== productId)
    }));

    // Remove the product from Firestore
    try {
      await deleteDoc(doc(db, 'products', productId));
      console.log('Product deleted successfully from Firestore.');
    } catch (error) {
      console.error('Error deleting product from Firestore:', error);
    }
  }
}));

export default useStore;
