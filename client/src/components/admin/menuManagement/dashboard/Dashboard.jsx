import React from "react";
import styles from "./Dashboard.module.css";
import cake from "../../../../assets/cake.jpg";
import {
  DollarOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const Dashboard = () => {
  const orders = [
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
  ];

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.contentWrapper}>
          <div className={styles.heading}>
            <h2>Dashboard Overview</h2>
          </div>

          <div className={styles.cards}>
            <div className={styles.card}>
              <DollarOutlined className={styles.cardIcon} />
              <div>
                <p>Today's Revenue</p>
                <h3>₹1,24,750</h3>
              </div>
            </div>
            <div className={styles.card}>
              <ShoppingCartOutlined className={styles.cardIcon} />
              <div>
                <p>Total Orders</p>
                <h3>47</h3>
              </div>
            </div>
            <div className={styles.card}>
              <AppstoreOutlined className={styles.cardIcon} />
              <div>
                <p>Menu Items</p>
                <h3>24</h3>
              </div>
            </div>
            <div className={styles.card}>
              <WarningOutlined className={styles.cardIcon} />
              <div>
                <p>Low Stock Items</p>
                <h3>3</h3>
              </div>
            </div>
          </div>

          <div className={styles.bottom}>
            <div className={styles.orders}>
              <h3>Recent Orders</h3>
              <ul>
                {orders.map((order) => (
                  <li key={order.id}>
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
            </div>

            <div className={styles.lowStock}>
              <h3>Low Stock Alert</h3>
              <div className={styles.stockItem}>
                <img
                  src={cake}
                  alt="Chocolate Cake"
                  className={styles.stockImage}
                />
                <div>
                  <strong>Chocolate Cake</strong>
                  <p>Dessert</p>
                </div>
                <span className={styles.stockQty}>8 left</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
