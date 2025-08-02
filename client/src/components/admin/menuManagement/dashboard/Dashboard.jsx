import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import cake from "../../../../assets/cake.jpg";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import {
  DollarOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import Sidebar from '../../adminSidebar/SideBar.jsx'

const Dashboard = () => {
  const [orders] = useState([
    {
      id: "ORD001",
      name: "John Smith",
      table: "T-05",
      price: 4998,
      status: "Preparing",
    },
    {
      id: "ORD002",
      name: "Sarah Johnson",
      table: "T-12",
      price: 4598,
      status: "Ready",
    },
    {
      id: "ORD003",
      name: "Mike Brown",
      table: "T-08",
      price: 1798,
      status: "Delivered",
    },
  ]);

  const handleOrderClick = (order) => {
    alert(
      `Order ID: ${order.id}\nCustomer: ${order.name}\nTable: ${order.table}\nStatus: ${order.status}`
    );
  };

  const cardData = [
    {
      icon: <DollarOutlined className={styles.cardIcon} />,
      title: "Today's Revenue",
      value: 124750,
    },
    {
      icon: <ShoppingCartOutlined className={styles.cardIcon} />,
      title: "Total Orders",
      value: 47,
    },
    {
      icon: <AppstoreOutlined className={styles.cardIcon} />,
      title: "Menu Items",
      value: 24,
    },
    {
      icon: <WarningOutlined className={styles.cardIcon} />,
      title: "Low Stock Items",
      value: 4,
    },
  ];

  const lowStockItems = [
    {
      name: "Chocolate Cake",
      category: "Dessert",
      qty: 8,
      image: cake,
    },
    {
      name: "Cheese Burger",
      category: "Main Course",
      qty: 5,
      image:
        "https://cdn.pixabay.com/photo/2014/04/22/02/56/burger-329523_1280.jpg",
    },
  ];

  return (
    <Sidebar>
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
                      {order.name} – {order.table}
                    </div>
                    <div>
                      ₹{order.price.toLocaleString("en-IN")} <br />
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
                      <p>{item.category}</p>
                    </div>
                    <span className={styles.stockQty}>{item.qty} left</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      </div>
      </Sidebar>
  );
};

export default Dashboard;
