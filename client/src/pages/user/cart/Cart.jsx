import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TAX_RATE = 0.05;
const user_id = 1; // Replace this dynamically if login implemented

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/cart/${user_id}`);
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (itemId, type) => {
    const item = cartItems.find((item) => item.id === itemId);
    const newQuantity =
      type === "inc" ? item.quantity + 1 : Math.max(1, item.quantity - 1);

    try {
      await axios.post(`http://localhost:5000/cart`, {
        user_id: user_id,
        item_id: itemId,
        quantity: newQuantity,
      });

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating item quantity:", error.message);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/cart/remove/${itemId}`);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    } catch (error) {
      console.error("Error removing item:", error.message);
    }
  };

  const handleClearCart = async () => {
    try {
      await axios.delete(`http://localhost:5000/cart/clear/${user_id}`);
      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error.message);
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax;

  return (
    <div>
      <nav className={styles.cart}>
        <a href="#">
          <span>
            <i className="fa-solid fa-arrow-left"></i>
          </span>
          Back to Menu
        </a>
        <h1>Shopping Cart</h1>
      </nav>

      <div className={styles.cartContainer}>
        <div className={styles.orderItems}>
          <h3>Order Items</h3>

          {loading ? (
            <p>Loading items...</p>
          ) : cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div className={styles.item} key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className={styles.itemDetails}>
                  <p>{item.name}</p>
                  <br />
                  <p>₹ {item.price}</p>
                </div>
                <div className={styles.quantity}>
                  <button onClick={() => handleQuantityChange(item.id, "dec")}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, "inc")}>
                    +
                  </button>
                </div>
                <p>₹ {item.price * item.quantity}</p>
                <button
                  className={styles.remove}
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            ))
          )}

          {cartItems.length > 0 && (
            <button className={styles.clearCart} onClick={handleClearCart}>
              Clear Cart
            </button>
          )}
        </div>

        <div className={styles.orderSummary}>
          <h3>Order Summary</h3>
          <p>
            Subtotal <span>₹ {subtotal}</span>
          </p>
          <p>
            Tax (5%) <span>₹ {tax}</span>
          </p>
          <hr />
          <h4>
            Total <span>₹ {total}</span>
          </h4>
          <button
            className={styles.checkout}
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
