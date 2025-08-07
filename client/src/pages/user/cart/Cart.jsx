import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const token = Cookies.get("your_jwt_secret_key");
  const user_id = jwtDecode(token)?.id;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/cart/${user_id}`)
      .then((res) => setCartItems(res.data.items || []))
      .catch((err) => console.error("Failed to fetch cart:", err));
  }, []);

  const updateQty = async (id, type) => {
    const item = cartItems.find((i) => i.id === id);
    const quantity = type === "inc" ? item.quantity + 1 : Math.max(1, item.quantity - 1);
    await axios.post("http://localhost:5000/api/cart", {
      user_id,
      item_id: item.item_id,
      quantity,
    });
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity, amount: quantity * i.Item.price } : i
      )
    );
  };

  
  const removeItem = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/cart/remove/${id}`);
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  } catch (error) {
    console.error("Error removing item:", error);
  }
};

  const subtotal = cartItems.reduce((s, i) => s + i.Item.price * i.quantity, 0);
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;


  return (
    <div>
      <nav className={styles.cart}>
        <a onClick={() => navigate("/products")}>
          <i className="fa fa-arrow-left"></i> Back to Menu
        </a>
        <h1>Shopping Cart</h1>
      </nav>

      <div className={styles.cartContainer}>
        <div className={styles.orderItems}>
          {cartItems.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className={styles.item}>
                <img src={item.Item.image} alt={item.Item.name} />
                <div>
                  <p>{item.Item.name}</p>
                  <p>₹ {item.Item.price}</p>
                </div>
                <div>
                  <button onClick={() => updateQty(item.id, "dec")}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQty(item.id, "inc")}>+</button>
                </div>
                <p>₹ {item.Item.price * item.quantity}</p>
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            ))
          )}
        </div>

        <div className={styles.orderSummary}>
          <p>Subtotal: ₹ {subtotal}</p>
          <p>Tax: ₹ {tax}</p>
          <h4>Total: ₹ {total}</h4>
          <button onClick={() => navigate("/checkout")}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;