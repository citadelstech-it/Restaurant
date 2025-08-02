import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import styles from './Recipt.module.css';

const Recipt = () => {
  const navigate = useNavigate();
  const receiptRef = useRef();

  const handleBackToMenu = () => {
    navigate('/');
  };

  const handleDownload = async () => {
    const element = receiptRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('receipt.pdf');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <nav>
        <div className={styles.navbar}>
          <a className={styles.backLink} href="#" onClick={handleBackToMenu}>
            <span>
              <i className="fa-solid fa-house"></i>
            </span>{' '}
            Back to Menu
          </a>
          <h1 className={styles.header}>Order Receipt</h1>
        </div>
      </nav>

      <div className={styles.container}>
        <div className={styles.maincontainer} ref={receiptRef}>
          <div className={styles.confirmationBox}>
            <div className={styles.checkmark}>✔</div>
            <h2 className={styles.confirmTitle}>Order Confirmed!</h2>
            <p className={styles.confirmText}>
              Thank you for your order. Your food will be delivered soon.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.restaurantBox}>
              <h3 className={styles.restaurantName}>ARITAKU RESTAURENT</h3>
              <p>23 Gachibowli, Hyderabad</p>
              <p>Phone: (+91)9854865376</p>

              <hr className={styles.divider} />

              <div className={styles.orderInfo}>
                <p>
                  <span>Order Number:</span>
                  <span>ORD-54376</span>
                </p>
                <p>
                  <span>Date &amp; Time:</span>
                  <span>29/7/2025, 05:10:23 pm</span>
                </p>
              </div>

              <hr className={styles.divider} />

              <div className={styles.items}>
                <h4>ITEMS ORDERED:</h4>
                <div className={styles.itemRow}>
                  <span>Biryani</span>
                  <span>₹344</span>
                </div>
                <div className={styles.itemRow}>
                  <span>Sambar Rice</span>
                  <span>₹256</span>
                </div>

                <div className={styles.priceDetails}>
                  <div>
                    <span>Subtotal:</span>
                    <span>₹600</span>
                  </div>
                  <div>
                    <span>Gst (8%):</span>
                    <span>₹48</span>
                  </div>
                  <div>
                    <span>Delivery Fee:</span>
                    <span>₹32</span>
                  </div>
                </div>

                <hr className={styles.divider} />

                <div className={styles.totalRow}>
                  <span>TOTAL:</span>
                  <span>₹680</span>
                </div>
              </div>

              <p className={styles.footerText}>Thank you for dining with us!<br /></p>
            </div>
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.downloadBtn} onClick={handleDownload}>
            Download Receipt
          </button>
          <button className={styles.printBtn} onClick={handlePrint}>
            Print Receipt
          </button>
        </div>
      </div>
    </>
  );
};

export default Recipt;