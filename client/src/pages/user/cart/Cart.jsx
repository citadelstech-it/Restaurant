import React, { useState } from 'react';
import styles from './Cart.module.css';
import chickenbiryani from '../cart/Chicken Biryani.webp';
import muttonbiryani from '../cart/Mutton Biryani.webp';
import { useNavigate } from 'react-router-dom';

const TAX_RATE = 0.05;

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Chicken Biryani',
      price: 299,
      quantity: 1,
      image: chickenbiryani,
    },
    {
      id: 2,
      name: 'Mutton Biryani',
      price: 350,
      quantity: 1,
      image: muttonbiryani,
    },
  ]);

  const handleQuantityChange = (id, type) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: type === 'inc' ? item.quantity + 1 : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const navigate = useNavigate();

  const handleRemove = id => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax;

  return (
    <>
      <div>
        <nav className={styles.cart}>
          <a href="#"><span><i className="fa-solid fa-arrow-left"></i></span>Back to Menu</a>
          <h1>Shipping Cart</h1>
        </nav>
        <div className={styles.cartContainer}>
          <div className={styles.orderItems}>
            <h3>Order Items</h3>
            {cartItems.map(item => (
              <div className={styles.item} key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className={styles.itemDetails}>
                  <p>{item.name}</p>
                  <br />
                  <p>₹ {item.price}</p>
                </div>
                <div className={styles.quantity}>
                  <button onClick={() => handleQuantityChange(item.id, 'dec')}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 'inc')}>+</button>
                </div>
                <p>₹ {item.price * item.quantity}</p>
                <button className={styles.remove} onClick={() => handleRemove(item.id)}>Remove</button>
              </div>
            ))}
          </div>
          <div className={styles.orderSummary}>
            <h3>Order Summary</h3>
            <p>Subtotal <span>₹ {subtotal}</span></p>
            <p>Tax (5%) <span>₹ {tax}</span></p>
            <hr />
            <h4>Total <span>₹ {total}</span></h4>
            <button className={styles.checkout} onClick={()=>{navigate("/checkout")}}>Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;