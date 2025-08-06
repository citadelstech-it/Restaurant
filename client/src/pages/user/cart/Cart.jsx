import React, { useState, useEffect } from 'react';
import styles from './Cart.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TAX_RATE = 0.05;
const user_id = 1; // Replace with dynamic user_id if needed

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Fetch Cart Items from DB
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/cart/${user_id}`);
      setCartItems(res.data); // Ensure your backend sends {id, name, price, quantity, image}
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
    }
  };

  const handleQuantityChange = async (id, type) => {
    const item = cartItems.find(item => item.id === id);
    const newQuantity = type === 'inc' ? item.quantity + 1 : Math.max(1, item.quantity - 1);

    try {
      await axios.post(`http://localhost:5000/cart`, {
        user_id,
        item_id: id,
        quantity: newQuantity
      });

      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/cart/remove/${id}`);
      setCartItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax;

  return (
    <div>
      <nav className={styles.cart}>
        <a href="#"><span><i className="fa-solid fa-arrow-left"></i></span>Back to Menu</a>
        <h1>Shopping Cart</h1>
      </nav>
      <div className={styles.cartContainer}>
        <div className={styles.orderItems}>
          <h3>Order Items</h3>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map(item => (
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
            ))
          )}
        </div>
        <div className={styles.orderSummary}>
          <h3>Order Summary</h3>
          <p>Subtotal <span>₹ {subtotal}</span></p>
          <p>Tax (5%) <span>₹ {tax}</span></p>
          <hr />
          <h4>Total <span>₹ {total}</span></h4>
          <button className={styles.checkout} onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
        </div>
      </div>
      <div className={styles.rotatingBackground1}></div>
        <div className={styles.rotatingBackground2}></div>
        <div className={styles.rotatingBackground3}></div>
        <div className={styles.rotatingBackground4}></div>
        <div className={styles.rotatingBackground5}></div>
        <div className={styles.rotatingBackground6}></div>
        <div className={styles.rotatingBackground7}></div>
        <div className={styles.rotatingBackground8}></div>
        <div className={styles.rotatingBackground9}></div>
        <div className={styles.rotatingBackground10}></div>
    </div>
  );
};

export default Cart;