import React, { useState, useEffect } from "react";
import checkstyles from "../checkout/Checkout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const Checkout = () => {
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    paymentMethod: "",
  });

  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const token = Cookies.get("your_jwt_secret_key");
  const user_id = jwtDecode(token)?.id;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (!token) return;
        const response = await axios.get(
          `http://localhost:5000/api/cart/${user_id}`
        );
        console.log("Fetched items response:", response.data);
        const itemsArray = Array.isArray(response.data.items)
          ? response.data.items
          : [];
        setItems(itemsArray || []);
      } catch (error) {
        console.error("Error fetching items:", error);
        setItems([]);
      }
    };
    fetchItems();
  }, [user_id, token]);

  // GST & Total Calculations
  const calculateSubtotal = () =>
    items.reduce(
      (sum, item) =>
        sum + (item.Item?.price || 0) * (item.quantity || 1),
      0
    );
  const gstAmount = Math.round(calculateSubtotal() * 0.05);
  const calculateTotal = () => calculateSubtotal() + gstAmount;

  const handleBackToMenu = () => navigate("/");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateTransactionId = () => {
    const now = new Date();
    return `tnx${now.getFullYear()}${String(
      now.getMonth() + 1
    ).padStart(2, "0")}${String(now.getDate()).padStart(
      2,
      "0"
    )}${String(now.getHours()).padStart(2, "0")}${String(
      now.getMinutes()
    ).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`;
  };

  const checkoutToPhonepay = async (e) => {
    e.preventDefault();
    try {
      const { customer_name, customer_phone, customer_email, paymentMethod } =
        formData;
      const response = await axios.post(
        "http://localhost:5000/api/phonepe/pay",
        {
          name: customer_name,
          number: customer_phone,
          customer_email,
          paymentMethod,
          transactionId: generateTransactionId(),
          MUID: "user123",
          user_id,
          amount: calculateTotal(),
        }
      );
      if (response.status === 200) {
        window.location.href = response.data.redirectUrl;
      }
    } catch (err) {
      console.log(err, "from phonepay");
    }
  };

  return (
    <div>
      <div className={checkstyles.outnav}>
        <a className={checkstyles.backmenu} href="home" onClick={handleBackToMenu}>
          <p>← Back To Home</p>
        </a>
        <h1>Checkout</h1>
      </div>

      {showModal && (
        <div className={checkstyles.modalOverlay}>
          <div className={checkstyles.modalContent}>
            <h2>🎉 Order Placed Successfully!</h2>
            <p>Thank you for your order! Your food will be delivered soon.</p>
            <button onClick={() => navigate("/receipt")}>View Receipt</button>
          </div>
        </div>
      )}

      {!showModal && (
        <form onSubmit={checkoutToPhonepay} className={checkstyles.outmain}>
          <div className={checkstyles.grid1}>
            <h3>🛵 Delivery Information</h3>
            <label>Full Name</label>
            <input
              type="text"
              name="customer_name"
              placeholder="Enter your full name"
              value={formData.customer_name}
              onChange={handleChange}
              required
            />

            <label>Phone Number</label>
            <input
              type="tel"
              name="customer_phone"
              placeholder="Enter your phone number"
              value={formData.customer_phone}
              onChange={handleChange}
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="customer_email"
              placeholder="Enter your email"
              value={formData.customer_email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={checkstyles.grid2}>
            <h3>📦 Order Summary</h3>
            {items.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              items.map((item) => (
                <p key={item.id}>
                  {item.Item?.name} × {item.quantity || 1}{" "}
                  <strong>₹{(item.Item?.price || 0).toFixed(2)}</strong>
                </p>
              ))
            )}
            <hr />
            <p>Subtotal: ₹{calculateSubtotal().toFixed(2)}</p>
            <p>GST (5%): ₹{gstAmount.toFixed(2)}</p>
            <h4>
              Total <span>₹{calculateTotal().toFixed(2)}</span>
            </h4>
            <button type="submit">✓ Place Order</button>
          </div>

          <div className={checkstyles.grid3}>
            <h3>💳 Payment Methods</h3>
            <input
              type="radio"
              id="credit"
              name="paymentMethod"
              value="Credit/Debit Card"
              checked={formData.paymentMethod === "Credit/Debit Card"}
              onChange={handleChange}
            />
            <label htmlFor="credit">
              <FontAwesomeIcon icon={faCreditCard} className={checkstyles.icon} />
              Credit/Debit Card
            </label>
            <br />

            <input
              type="radio"
              id="phonepay"
              name="paymentMethod"
              value="PhonePay"
              checked={formData.paymentMethod === "PhonePay"}
              onChange={handleChange}
            />
            <label htmlFor="phonepay">
              <FontAwesomeIcon icon={faPhone} className={checkstyles.icon} />
              PhonePay
            </label>
            <br />
          </div>
        </form>
      )}

      {[...Array(10)].map((_, i) => (
        <div key={i} className={checkstyles[`rotatingBackground${i + 1}`]}></div>
      ))}
    </div>
  );
};

export default Checkout;
