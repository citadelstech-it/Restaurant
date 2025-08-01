import React, { useState } from 'react';
import checkstyles from "../checkout/Checkout.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';

const Checkout = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    instructions: '',
    payment: '',
  });

  const [showModal, setShowModal] = useState(false); 

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'radio' ? value : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, phone, address, payment } = formData;
    if (!fullName || !phone || !address || !payment) {
      alert('Please fill all required fields and select a payment method.');
      return;
    }

    
    setShowModal(true);

    
    setFormData({
      fullName: '',
      phone: '',
      address: '',
      instructions: '',
      payment: '',
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className={checkstyles.outnav}>
        <p>← Back to Home</p>
        <h1>Checkout</h1>
      </div>

    
      {showModal && (
        <div className={checkstyles.modalOverlay}>
          <div className={checkstyles.modalContent}>
            <h2>🎉 Order Placed Successfully!</h2>
            <p>Thank you for your order! Your food will be delivered soon.</p>
            <button onClick={closeModal}>OK</button>
          </div>
        </div>
      )}

      
      {!showModal && (
        <form onSubmit={handleSubmit} className={checkstyles.outmain}>

          <div className={checkstyles.grid1}>
            <h3>🛵 Delivery Information</h3>

            <label>Full Name</label><br />
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required /><br />

            <label>Phone Number</label><br />
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required /><br />

            <label>Delivery Address</label><br />
            <textarea
              name="address"
              rows="3"
              placeholder="Enter your complete address"
              value={formData.address}
              onChange={handleChange}
              required /><br />

            <label>Special Instructions</label><br />
            <textarea
              name="instructions"
              rows="2"
              placeholder="Any special requests or instructions"
              value={formData.instructions}
              onChange={handleChange} />
          </div>

          <div className={checkstyles.grid2}>
            <h3>📦 Order Summary</h3>
            <p>Chicken Fry × 1 <strong>₹66.90</strong></p>
            <p>Bagara Rice × 1 <strong>₹13.00</strong></p>
            <hr />
            <h4>Total <span>₹79.90</span></h4>
            <button type="submit">✓ Place Order</button>
          </div>

          <div className={checkstyles.grid3}>
            <h3>💳 Payment Methods</h3>

            <input
              type="radio"
              id="credit"
              name="payment"
              value="Credit/Debit Card"
              checked={formData.payment === 'Credit/Debit Card'}
              onChange={handleChange} />
            <label htmlFor="credit">
              <FontAwesomeIcon icon={faCreditCard} className={checkstyles.icon} />
              Credit/Debit Card
            </label><br />
            <input
              type="radio"
              id="paypal"
              name="payment"
              value="PayPal"
              checked={formData.payment === 'PayPal'}
              onChange={handleChange} />
            <label htmlFor="paypal">
              <FontAwesomeIcon icon={faPaypal} className={checkstyles.icon} />
              PayPal
            </label><br />
          </div>

        </form>
      )}
    </div>
  );
};

export default Checkout;
