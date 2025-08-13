import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import axios from "axios";
import {
  DollarOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import SideBar from "../adminSidebar/SideBar";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [cardData, setCardData] = useState([]);

  const handleOrderClick = (order) => {
    alert(
      `Order ID: ${order.id}\nCustomer: ${order.name}\nTable: ${order.table}\nStatus: ${order.status}`
    );
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders/dashboard");
        const data = res.data;

        setOrders(data.recentOrders || []);
        setLowStockItems(data.lowStockItems || []);

        setCardData([
          {
            icon: <DollarOutlined className={styles.cardIcon} />,
            title: "Today's Revenue",
            value: data.totalRevenue || 0,
          },
          {
            icon: <ShoppingCartOutlined className={styles.cardIcon} />,
            title: "Total Orders",
            value: data.totalOrders || 0,
          },
          {
            icon: <AppstoreOutlined className={styles.cardIcon} />,
            title: "Menu Items",
            value: data.menuItemsCount || 0,
          },
          {
            icon: <WarningOutlined className={styles.cardIcon} />,
            title: "Low Stock Items",
            value: data.lowStockCount || 0,
          },
        ]);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <SideBar>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.contentWrapper}>
            <div className={styles.titleSection}>
              <h2>Dashboard Overview</h2>
            </div>

            <div className={styles.cards}>
              {cardData.map((card, index) => (
                <motion.div
                  key={index}
                  className={styles.card}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  {card.icon}
                  <div>
                    <p>{card.title}</p>
                    <h3>
                      <CountUp
                        end={card.value}
                        duration={1.5}
                        prefix={card.title.includes("Revenue") ? "₹" : ""}
                      />
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className={styles.bottom}>
              <motion.div
                className={styles.orders}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3>Recent Orders</h3>
                <ul>
                  {orders.map((order) => (
                    <li
                      key={order.id}
                      className={styles.clickable}
                      onClick={() => handleOrderClick(order)}
                    >
                      <div>
                        <strong>{order.id}</strong> <br />
                        {order.name || order.name} – {order.table || order.table}
                      </div>
                      <div>
                        ₹{order.GrandTotal?.toLocaleString("en-IN") || "0"} <br />
                        <span className={styles[`status${order.status}`]}>
                          {order.status}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className={styles.lowStock}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3>Low Stock Alert</h3>
                <div className={styles.stockList}>
                  {lowStockItems.map((item, index) => (
                    <div className={styles.stockItem} key={index}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className={styles.stockImage}
                      />
                      <div>
                        <strong>{item.name}</strong>
                        <p>{item.Category?.name || "No Category"}</p>
                      </div>
                      <span className={styles.stockQty}>
                        {item.inStock} left
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </SideBar>
  );
};

export default Dashboard;
