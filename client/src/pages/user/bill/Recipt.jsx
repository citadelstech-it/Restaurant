import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import dayjs from "dayjs";

// import bgVideo from "../../../assets/background.mp4";
import styles from "./Recipt.module.css";

const Recipt = () => {
  const navigate = useNavigate();
  const cardRef = useRef();
  const { id } = useParams();

  const [orderData, setOrderData] = useState({
    orderNumber: "",
    dateTime: "",
    items: [],
    subtotal: 0,
    GST: 0,
    total: 0,
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderId = id;
        if (!orderId) {
          console.warn("No order ID provided");
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/orders/getOrders/${orderId}`
        );

        const data = response.data;
        console.log("Fetched Order Data:", data);

        const items = data.OrderItems?.map((item) => {
          const name = item.Item?.name || "Unnamed Item";
          const price = item.Item?.price || 0;
          const quantity = item.quantity || 0;

          return {
            name,
            price,
            quantity,
            total: price * quantity,
          };
        }) || [];
        const rawDate = data.createdAt;
        let formattedDateTime = "Unknown";

        if (rawDate) {
          const parsedDate = dayjs(rawDate);
          formattedDateTime = parsedDate.isValid()
            ? parsedDate.format("YYYY-MM-DD HH:mm:ss")
            : "Invalid Date";
        }

        const formattedData = {
          orderNumber: data.Order_Id || "N/A",
          dateTime: formattedDateTime,
          items,
          subtotal: data.total || 0,
          GST: data.GST || 0,
          total: data.GrandTotal || 0,
        };

        setOrderData(formattedData);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      }
    };

    fetchOrder();
  }, [id]);

  const handleBackToMenu = () => {
    navigate('/menu-management');
  };

  const handleDownload = async () => {
    const element = cardRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("receipt.pdf");
  };

  const handlePrint = () => {
    window.print();
  };

  const { orderNumber, dateTime, items, subtotal, GST, total } = orderData;

  return (
    <>
      <nav>
        <div className={styles.navbar}>
          <a className={styles.backLink} href="home" onClick={handleBackToMenu}>
            ← Back To Home
          </a>
          <h1 className={styles.header}>Order Receipt</h1>
        </div>
      </nav>

      {/* <div className={styles.videoBackground}>
        <video
          className={styles.videoBackground}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={bgVideo} type="video/mp4" />
        </video> */}

        <div className={styles.container}>
          <div className={styles.maincontainer}>
            <div className={styles.confirmationBox}>
              <div className={styles.checkmark}>✔</div>
              <h2 className={styles.confirmTitle}>Order Confirmed!</h2>
              <p className={styles.confirmText}>
                Thank you for your order. Your food will be delivered soon.
              </p>
            </div>

            <div className={styles.card} ref={cardRef}>
              <div className={styles.restaurantBox}>
                <h3 className={styles.restaurantName}>ARITAKU RESTAURANT</h3>
                <p>23 Gachibowli, Hyderabad</p>
                <p>Phone: (+91) 98548 65376</p>
                <hr className={styles.divider} />
                <div className={styles.orderInfo}>
                  <p>
                    <span>Order Number:</span>
                    <span>{orderNumber}</span>
                  </p>
                  <p>
                    <span>Date &amp; Time:</span>
                    <span>{dateTime}</span>
                  </p>
                </div>
                <hr className={styles.divider} />

                <div className={styles.items}>
                  <h4>ITEMS ORDERED:</h4>

                  {items.length > 0 ? (
                    <div className={styles.itemList}>
                      {items.map((item, index) => (
                        <div className={styles.itemRow} key={index}>
                          <div>
                            {item.name} x {item.quantity}
                          </div>
                          <div>₹{item.price.toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No items found.</p>
                  )}

                  <div className={styles.priceDetails}>
                    <div>
                      <span>Subtotal:</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div>
                      <span>GST (18%):</span>
                      <span>₹{GST.toFixed(2)}</span>
                    </div>
                  </div>
                  <hr className={styles.divider} />
                  <div className={styles.totalRow}>
                    <span>TOTAL:</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <p className={styles.footerText}>
                  Thank you for dining with us!
                </p>
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

      {/* </div> */}
    </>
  );
};

export default Recipt;
