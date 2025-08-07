import React, { useEffect, useState } from 'react';
import orderStyle from '../../admin/orderManagement/OrderManagement.module.css';
import SideBar from '../adminSidebar/sideBar';
import axios from 'axios';


const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All Orders');

const fetchOrders = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/orders/getOrders');
    const fetchedOrders = response.data.orders || [];

    setOrders(prevOrders => {
      const existingOrderIds = new Set(prevOrders.map(order => order._id));
      const newOrders = fetchedOrders.filter(order => !existingOrderIds.has(order._id));

      if (newOrders.length === 0) {
        alert("No new data found");
        return prevOrders; 
      }

      return [...newOrders, ...prevOrders];
    });

  } catch (error) {
    console.error("Failed to fetch orders:", error);
  }
};

  useEffect(() => {
    fetchOrders();
  }, []);

  const getNextStatus = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'preparing';
      case 'preparing': return 'ready';
      case 'ready': return 'delivered';
      case 'delivered': return 'completed';
      default: return null;
    }
  };

  const getPreviousStatus = (status) => {
  switch (status.toLowerCase()) {
    case 'preparing': return 'pending';
    case 'ready': return 'preparing';
    case 'delivered': return 'ready';
    case 'completed': return 'delivered';
    default: return null;
  }
};


  const getActionLabel = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'Mark as Preparing';
      case 'preparing': return 'Mark as Ready';
      case 'ready': return 'Mark as Delivered';
      case 'delivered': return 'Mark as Completed';
      default: return '';
    }
  };

  const handleLocalStatusUpdate = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map(order => {
        if (order.id === orderId) {
          const next = getNextStatus(order.status);
          return next ? { ...order, status: next } : order;
        }
        return order;
      })
    );
  };

  const handleLocalStatusBack = (orderId) => {
  setOrders((prevOrders) =>
    prevOrders.map(order => {
      if (order.id === orderId) {
        const prev = getPreviousStatus(order.status);
        return prev ? { ...order, status: prev } : order;
      }
      return order;
    })
  );
};

  const handleBack = () => {
    navigate(-1); 
  };

  const filteredOrders = orders.filter(order =>
    filter === 'All Orders' ? true : order.status.toLowerCase() === filter.toLowerCase()
  );

  return (
    <SideBar>
      <div className={orderStyle.pageContainer}>
        <div className={orderStyle.header}>
          <h1 className={orderStyle.title}>Order Management</h1>
          <div className={orderStyle.controls}>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={orderStyle.select}>
              <option>All Orders</option>
              <option>pending</option>
              <option>preparing</option>
              <option>ready</option>
              <option>delivered</option>
              <option>completed</option>
            </select>
            <button onClick={fetchOrders} className={orderStyle.refreshBtn}>Refresh</button>
            <button className={orderStyle.historyBtn}>View Order History</button>
          </div>
        </div>
   
        <div className={orderStyle.cardContainer}>
          {filteredOrders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            filteredOrders.map((order) => {
              const nextStatus = getNextStatus(order.status);
              const actionLabel = getActionLabel(order.status);

              return (
                <div key={order.id} className={orderStyle.card}>
                  <h3>Order ID: {order.Order_Id}</h3>
                  <p><strong>Customer:</strong> {order.customer_name}</p>
                  <p><strong>Status:</strong> {order.status}</p>
                  <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                  <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>

                  <h4>Items:</h4>
                  {order.OrderItems?.length > 0 ? (
                    order.OrderItems.map((item, index) => (
                      <p key={index}>{item.quantity} x {item.name} - ₹{item.price}</p>
                    ))
                  ) : (
                    <p style={{ color: 'gray' }}>No items</p>
                  )}

                  <hr />
                  <p><strong>Total:</strong> ₹{order.total?.toFixed(2)}</p>
                  <p><strong>GST ({order.GST}%):</strong> ₹{((order.total * order.GST) / 100).toFixed(2)}</p>
                  <p><strong>Grand Total:</strong> ₹{order.GrandTotal?.toFixed(2)}</p>
       
                 {getPreviousStatus(order.status) && (
                           <button onClick={() => handleLocalStatusBack(order.id)} className={orderStyle.back}>Back</button>)}

                  {nextStatus && (
                    <div className={orderStyle.actions}>
                      <button onClick={() => handleLocalStatusUpdate(order.id)}>
                        {actionLabel}
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
        <div className={orderStyle.previous}>
          <button className={orderStyle.nextbuttons}>
            <a href="#" className="previous">&laquo; Previous</a>
          </button>
          <button className={orderStyle.nextbuttons}>
            <a href="#" className="next">Next &raquo;</a>
          </button>
        </div>
      </div>
    </SideBar>
  );
};

export default OrderManagement;