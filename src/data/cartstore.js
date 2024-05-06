import { create } from 'zustand';

const useCartStore = create((set) => {
  // Initialize cartItems from local storage or set it to an empty array
  const initialCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  return {
    cartItems: initialCartItems,

    addToCart: (item) => {
      set((state) => {
        const existingItem = state.cartItems.find((cartItem) => cartItem.id === item.id);

        if (existingItem) {
          const updatedCartItems = state.cartItems.map((cartItem) =>
            cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
          );
          localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
          return { cartItems: updatedCartItems };
        } else {
          const updatedCartItems = [...state.cartItems, { ...item, quantity: 1 }];
          localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
          return { cartItems: updatedCartItems };
        }
      });
    },

    removeFromCart: (itemId) => {
      set((state) => {
        const updatedCartItems = state.cartItems.filter((cartItem) => cartItem.id !== itemId);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        return { cartItems: updatedCartItems };
      });
    },

    increaseQuantity: (itemId) => {
      set((state) => {
        const updatedCartItems = state.cartItems.map((cartItem) =>
          cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        return { cartItems: updatedCartItems };
      });
    },

    decreaseQuantity: (itemId) => {
      set((state) => {
        const updatedCartItems = state.cartItems.map((cartItem) =>
          cartItem.id === itemId && cartItem.quantity > 1
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        return { cartItems: updatedCartItems };
      });
    },
  };
});

export default useCartStore;
