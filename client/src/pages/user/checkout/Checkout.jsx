import React, { useState, useEffect } from "react";
import checkstyles from "../checkout/Checkout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cart");
        console.log("Fetched items response:", response.data);

        const itemsArray = Array.isArray(response.data)
          ? response.data
          : response.data.items;

        setItems(itemsArray || []);
      } catch (error) {
        console.error("Error fetching items:", error);
        setItems([]);
      }
    };

    fetchItems();
  }, []);

  const calculateTotal = () =>
    items.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
      0
    );

  const handleBackToMenu = () => navigate("/");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateTransactionId = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `tnx${year}${month}${day}${hours}${minutes}${seconds}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { customer_name, customer_phone, customer_email, paymentMethod } =
      formData;

    if (!customer_name || !customer_phone || !customer_email || !paymentMethod) {
      alert("Please fill all required fields and select a payment method.");
      return;
    }

    const totalAmount = calculateTotal();


    if (paymentMethod === "PhonePay") {
      const transactionId = generateTransactionId();
      const MUID = `MUID${Math.floor(Math.random() * 1000000)}`;

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "http://localhost:5000/api/phonepe/pay";

      const payload = {
        transactionId,
        MUID,
        name: customer_name,
        amount: totalAmount,
        number: customer_phone,
        user_id: 6,
        customer_email,
        paymentMethod
      };

      for (const key in payload) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = payload[key];
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
      return;
    }

   
    try {
      const payload = {
        user_id: 6,
        customer_name,
        customer_email,
        customer_phone,
        amount: formData.amount || totalAmount,
        paymentMethod,
      };

      const response = await fetch(
        "http://localhost:5000/api/orders/checkout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const err = await response.text();
        console.error("Backend error:", err);
        throw new Error("Order submission failed");
      }

      const data = await response.json();
      console.log("Order Success:", data);

      setShowModal(true);
      setFormData({
        customer_name: "",
        customer_phone: "",
        customer_email: "",
        paymentMethod: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to place order. Please try again.");
    }
  };


  const checkoutToPhonepay = async (e) => {
    e.preventDefault()
    try {
      const { customer_name, customer_phone, customer_email, paymentMethod } =
        formData;
      const response = await axios.post("http://localhost:5000/api/phonepe/pay", {
        name: customer_name,
        number: customer_phone,
        customer_email,
        paymentMethod,
        transactionId: generateTransactionId(),
        MUID: "user123",
        user_id: 6,
        amount: 20
      })
      console.log(response, "form checkout")
      if(response.status===200){
        window.location.href=response.data.redirectUrl
      }
    }
    catch (err) {
      console.log(err, "from phonepay")
    }
  }

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
                <p key={item.id || item._id}>
                  {item.name} × {item.quantity || 1}{" "}
                  <strong>₹{(item.price || 0).toFixed(2)}</strong>
                </p>
              ))
            )}
            <hr />
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
