import React, { useState } from 'react';
import styles from './OrderHistory.module.css';
import { motion, AnimatePresence } from 'framer-motion';

const sampleOrders = [
  { id: 'ORD001', customer: 'John Doe', date: '2025-07-31', status: 'Completed', total: 4500 },
  { id: 'ORD002', customer: 'Jane Smith', date: '2025-07-30', status: 'Canceled', total: 3000 },
  { id: 'ORD003', customer: 'Alice Johnson', date: '2025-07-25', status: 'Completed', total: 7500 },
  { id: 'ORD004', customer: 'Bob Brown', date: '2025-07-01', status: 'Completed', total: 2000 },
];

const getFilteredOrders = (orders, filter) => {
  const now = new Date();
  return orders.filter(order => {
    const orderDate = new Date(order.date);
    const diffDays = (now - orderDate) / (1000 * 60 * 60 * 24);
    if (filter === 'today') return diffDays < 1;
    if (filter === 'yesterday') return diffDays >= 1 && diffDays < 2;
    if (filter === 'weekly') return diffDays < 7;
    if (filter === 'monthly') return diffDays < 30;
    if (filter === 'yearly') return diffDays < 365;
    return true;
  });
};

const OrderHistory = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState(sampleOrders);

  const filteredOrders = getFilteredOrders(orders, filter).filter(order =>
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.orderHistory}>
      <h2 className={styles.heading}>Order History</h2>

      <div className={styles.filters}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search by customer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className={styles.select}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredOrders.map((order) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <td>{order.date}</td>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.status}</td>
                  <td>₹{order.total.toLocaleString('en-IN')}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
