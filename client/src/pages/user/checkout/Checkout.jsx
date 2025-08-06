// import React, { useState } from 'react';
// import checkstyles from "../checkout/Checkout.module.css";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCreditCard, faPhone,  } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';

// const Checkout = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     phone: '',
//     email: '',
//     instructions: '',
//     payment: '',
//   });

//   const navigate = useNavigate();
//   const handleBackToMenu = () => {
//     navigate('/');
//   };

//   const [showModal, setShowModal] = useState(false); 

//   const handleChange = (e) => {
//     const { name, value, type } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'radio' ? value : value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const { fullName, phone, email, payment } = formData;
//     if (!fullName || !phone || !email || !payment) {
//       alert('Please fill all required fields and select a payment method.');
//       return;
//     }

    
//     setShowModal(true);

    
//     setFormData({
//       fullName: '',
//       phone: '',
//       email: '',
//       instructions: '',
//       payment: '',
//     });
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <div>
//       <div className={checkstyles.outnav}>
//         <a className={checkstyles.backmenu} href="#" onClick={handleBackToMenu}><p>← Back To Menu</p></a>
//         <h1>Checkout</h1>
//       </div>

    
//       {showModal && (
//         <div className={checkstyles.modalOverlay}>
//           <div className={checkstyles.modalContent}>
//             <h2>🎉 Order Placed Successfully!</h2>
//             <p>Thank you for your order! Your food will be delivered soon.</p>
//             <button onClick={()=>{navigate("/recipt")}}>View Recipt</button>
//           </div>
//         </div>
//       )}

      
//       {!showModal && (
//         <form onSubmit={handleSubmit} className={checkstyles.outmain}>

//           <div className={checkstyles.grid1}>
//             <h3>🛵 Delivery Information</h3>

//             <label>Full Name</label><br />
//             <input
//               type="text"
//               name="fullName"
//               placeholder="Enter your full name"
//               value={formData.fullName}
//               onChange={handleChange}
//               required /><br />

//             <label>Phone Number</label><br />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Enter your phone number"
//               value={formData.phone}
//               onChange={handleChange}
//               required /><br />

//             <label>Email</label><br />
//             <input
//               name="email"
//               rows="3"
//               placeholder="Enter your email "
//               value={formData.email}
//               onChange={handleChange}
//               required /><br />

//             <label>Special Instructions</label><br />
//             <textarea
//               name="instructions"
//               rows="2"
//               placeholder="Any special requests or instructions"
//               value={formData.instructions}
//               onChange={handleChange} />
//           </div>

//           <div className={checkstyles.grid2}>
//             <h3>📦 Order Summary</h3>
//             <p>Chicken Fry × 1 <strong>₹66.90</strong></p>
//             <p>Bagara Rice × 1 <strong>₹13.00</strong></p>
//             <hr />
//             <h4>Total <span>₹79.90</span></h4>
//             <button type="submit">✓ Place Order</button>
//           </div>

//           <div className={checkstyles.grid3}>
//             <h3>💳 Payment Methods</h3>

//             <input
//               type="radio"
//               id="credit"
//               name="payment"
//               value="Credit/Debit Card"
//               checked={formData.payment === 'Credit/Debit Card'}
//               onChange={handleChange} />
//             <label htmlFor="credit">
//               <FontAwesomeIcon icon={faCreditCard} className={checkstyles.icon} />
//               Credit/Debit Card
//             </label><br/>
//             <input
//               type="radio"
//               id="phonepay"
//               name="payment"
//               value="Phonepay"
//               checked={formData.payment === 'PhonePay'}
//               onChange={handleChange} />
//             <label htmlFor="paypal">
//               <FontAwesomeIcon icon={faPhone} className={checkstyles.icon} />
//               PhonePay
//             </label><br />
//           </div>

//         </form>
//       )}
//       <div className={checkstyles.rotatingBackground1}></div>
//         <div className={checkstyles.rotatingBackground2}></div>
//         <div className={checkstyles.rotatingBackground3}></div>
//         <div className={checkstyles.rotatingBackground4}></div>
//         <div className={checkstyles.rotatingBackground5}></div>
//         <div className={checkstyles.rotatingBackground6}></div>
//         <div className={checkstyles.rotatingBackground7}></div>
//         <div className={checkstyles.rotatingBackground8}></div>
//         <div className={checkstyles.rotatingBackground9}></div>
//         <div className={checkstyles.rotatingBackground10}></div>
//     </div>
//   );
// };

// export default Checkout;


import React, { useState, useEffect } from "react";
import checkstyles from "../checkout/Checkout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    instructions: "",
    paymentMethod: "",
  });

  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Fetch order items from backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/items");
        if (!response.ok) throw new Error("Failed to fetch items");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  // Calculate total
  const calculateTotal = () =>
    items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  const handleBackToMenu = () => navigate("/");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { customer_name, customer_phone, customer_email, paymentMethod } =
      formData;

    if (!customer_name || !customer_phone || !customer_email || !paymentMethod) {
      alert("Please fill all required fields and select a payment method.");
      return;
    }

    // Only send the attributes your backend expects
    const payload = {
      user_id: Math.floor(Math.random() * 5) + 2, // 2 to 6
      customer_name,
      customer_email,
      customer_phone,
      paymentMethod,
    };

    try {
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
        instructions: "",
        paymentMethod: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div>
      {/* Navigation */}
      <div className={checkstyles.outnav}>
        <a className={checkstyles.backmenu} href="#" onClick={handleBackToMenu}>
          <p>← Back To Menu</p>
        </a>
        <h1>Checkout</h1>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className={checkstyles.modalOverlay}>
          <div className={checkstyles.modalContent}>
            <h2>🎉 Order Placed Successfully!</h2>
            <p>Thank you for your order! Your food will be delivered soon.</p>
            <button onClick={() => navigate("/recipt")}>View Receipt</button>
          </div>
        </div>
      )}

      {/* Checkout Form */}
      {!showModal && (
        <form onSubmit={handleSubmit} className={checkstyles.outmain}>
          {/* Delivery Info */}
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

            <label>Special Instructions</label>
            <textarea
              name="instructions"
              rows="2"
              placeholder="Any special requests or instructions"
              value={formData.instructions}
              onChange={handleChange}
            />
          </div>

          {/* Order Summary */}
          <div className={checkstyles.grid2}>
            <h3>📦 Order Summary</h3>
            {items.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              items.map((item) => (
                <p key={item.id}>
                  {item.name} × {item.quantity || 1}{" "}
                  <strong>₹{item.price.toFixed(2)}</strong>
                </p>
              ))
            )}
            <hr />
            <h4>
              Total <span>₹{calculateTotal().toFixed(2)}</span>
            </h4>
            <button type="submit">✓ Place Order</button>
          </div>

          {/* Payment Methods */}
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

      {/* Rotating Fruits */}
      {[...Array(10)].map((_, i) => (
        <div key={i} className={checkstyles[`rotatingBackground${i + 1}`]}></div>
      ))}
    </div>
  );
};

export default Checkout;
