import React, { useEffect } from 'react';
import useCartStore from '../data/cartstore';
import "../stylesheet/Cart.css";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = useCartStore();
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

 
  useEffect(() => {
    
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (storedCartItems.length !== cartItems.length) {
      storedCartItems.forEach(item => addToCart(item));
    }
  }, [addToCart, cartItems]);

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  const handleOrderNow = () => {
    console.log('Order now button clicked!');
  };

  return (
    <div>
      <div className="shopping-cart">
        <h1>Shopping Cart</h1>
        <ul className="cart-items-list">
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <span className="item-name">{item.name}</span> -
              <span className="item-price">${item.price}</span>
              <div className="quantity-controls">
                <button className="quantity-btn" onClick={() => decreaseQuantity(item.id)}>-</button>
                <span className="item-quantity">{item.quantity}</span>
                <button className="quantity-btn" onClick={() => increaseQuantity(item.id)}>+</button>
              </div>
              <button className="remove-btn" onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <div className="total-price">Total Price: ${totalPrice.toFixed(2)}</div>
        <button className="order-now" onClick={handleOrderNow}>Order Now</button>
      </div>
    </div>
  );
};

export default Cart;
