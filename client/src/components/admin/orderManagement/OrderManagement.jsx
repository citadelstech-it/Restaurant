<<<<<<< HEAD
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
// =======
// import React, { useState, useEffect } from 'react';
// import orderStyle from '../../admin/orderManagement/OrderManagement.module.css';
// import SideBar from '../adminSidebar/sideBar';

// const initialOrders = [
//     {
//         id: 'ORD006',
// <<<<<<<< HEAD:client/src/components/admin/orderManagement/OrederManagement.jsx
//         date: '2025-08-02 13:45', 
// ========
//         date: '2025-08-02 14:49',
// >>>>>>>> 87177930d92cd4c6b3036e94e60f006a2f98d825:client/src/components/admin/orderManagement/OrderManagement.jsx
//         customer: 'Sundari',
//         table: 'T-09',
//         items: [
//             { name: 'Chocolate Cake', quantity: 2, price: 50 },
//             { name: 'Grilled Salmon', quantity: 1, price: 50 },
//             { name: 'Beef Steak', quantity: 1, price: 65 }
//         ],
//         status: 'Preparing'
//     },
//     {
//         id: 'ORD005',
// <<<<<<<< HEAD:client/src/components/admin/orderManagement/OrederManagement.jsx
//         date: '2025-08-2 13:20', 
// ========
//         date: '2025-08-01 13:20',
// >>>>>>>> 87177930d92cd4c6b3036e94e60f006a2f98d825:client/src/components/admin/orderManagement/OrderManagement.jsx
//         customer: 'Bhanu',
//         table: 'T-01',
//         items: [
//             { name: 'Chocolate Cake', quantity: 3, price: 50 },
//             { name: 'Grilled Salmon', quantity: 1, price: 50 }
//         ],
//         status: 'Preparing'
//     },
//     {
//         id: 'ORD004',
// <<<<<<<< HEAD:client/src/components/admin/orderManagement/OrederManagement.jsx
//         date: '2025-08-02 13:00', 
// ========
//         date: '2025-08-01 13:00',
// >>>>>>>> 87177930d92cd4c6b3036e94e60f006a2f98d825:client/src/components/admin/orderManagement/OrderManagement.jsx
//         customer: 'Babu',
//         table: 'T-03',
//         items: [
//             { name: 'Chocolate Cake', quantity: 2, price: 50 },
//             { name: 'Beef Steak', quantity: 2, price: 65 }
//         ],
//         status: 'Ready'
//     },
//     {
//         id: 'ORD003',
// <<<<<<<< HEAD:client/src/components/admin/orderManagement/OrederManagement.jsx
//         date: '2025-08-2 13:30', 
// ========
//         date: '2025-08-01 13:30',
// >>>>>>>> 87177930d92cd4c6b3036e94e60f006a2f98d825:client/src/components/admin/orderManagement/OrderManagement.jsx
//         customer: 'John Smith',
//         table: 'T-05',
//         items: [{ name: 'Grilled Salmon', quantity: 2, price: 50 }],
//         status: 'Ready'
//     },
//     {
//         id: 'ORD002',
// <<<<<<<< HEAD:client/src/components/admin/orderManagement/OrederManagement.jsx
//         date: '2025-08-2 13:25',
// ========
//         date: '2025-08-01 13:25',
// >>>>>>>> 87177930d92cd4c6b3036e94e60f006a2f98d825:client/src/components/admin/orderManagement/OrderManagement.jsx
//         customer: 'Sarah Johnson',
//         table: 'T-12',
//         items: [
//             { name: 'Caesar Salad', quantity: 1, price: 30 },
//             { name: 'Beef Steak', quantity: 1, price: 65 }
//         ],
//         status: 'Delivered'
//     },
//     {
//         id: 'ORD001',
// <<<<<<<< HEAD:client/src/components/admin/orderManagement/OrederManagement.jsx
//         date: '2025-08-2 13:15', 
// ========
//         date: '2025-08-01 13:15',
// >>>>>>>> 87177930d92cd4c6b3036e94e60f006a2f98d825:client/src/components/admin/orderManagement/OrderManagement.jsx
//         customer: 'Mike Brown',
//         table: 'T-06',
//         items: [
//             { name: 'Chocolate Cake', quantity: 2, price: 50 }
//         ],
//         status: 'Delivered'
//     }
// ];

// const OrderManagement = () => {
//     const [orders, setOrders] = useState(initialOrders);
//     const [filter, setFilter] = useState('All Orders');
//     const [liveDateTime, setLiveDateTime] = useState(new Date());

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setLiveDateTime(new Date());
//         }, 1000);
//         return () => clearInterval(interval);
//     }, []);

//     const handleStatusChange = (id, newStatus) => {
//         const updatedOrders = orders.map(order =>
//             order.id === id ? { ...order, status: newStatus } : order
//         );
//         setOrders(updatedOrders);
//     };

//     const getOrderTotal = (items) =>
//         items.reduce((acc, item) => acc + item.price * item.quantity, 0);

//     const todayDate = new Date().toISOString().split("T")[0];

//     const filteredOrders = orders.filter(order => {
//         const orderDate = order.date.split(" ")[0];
//         return (filter === 'All Orders' ? true : order.status === filter) && orderDate === todayDate;
//     });

//     const handleFilterChange = (e) => {
//         setFilter(e.target.value);
//     };

//     const handleRefresh = () => {
//         setOrders([...initialOrders]);
//     };

//     return (
//         <div>
//             <header>
//                 <div className={orderStyle.header}>
//                     <h2>Order Management</h2>
//                     <div className={orderStyle.dateTime}>
//                         {liveDateTime.toLocaleDateString()} {liveDateTime.toLocaleTimeString()}
//                     </div>
//                     <select className={orderStyle.order} onChange={handleFilterChange} value={filter}>
//                         <option value="All Orders">All Orders</option>
//                         <option value="Preparing">Preparing</option>
//                         <option value="Ready">Ready</option>
//                         <option value="Delivered">Delivered</option>
//                     </select>
//                     <button className={orderStyle.refre1} onClick={handleRefresh}>
//                         <i className="fa-solid fa-arrows-rotate"></i> Refresh
//                     </button>
//                 </div>

//                 {filteredOrders.map((order) => (
//                     <div key={order.id} className={orderStyle.customen}>
//                         <br />
//                         <h4>{order.id}</h4>
//                         <p>{order.date}</p>
//                         <p>Customer: {order.customer}</p>
//                         <p>Table: {order.table}</p>
//                         <hr />
//                         <h5>Order Items:</h5>
//                         {order.items.map((item, idx) => (
//                             <p key={idx}>
//                                 {item.quantity}x {item.name}
//                             </p>
//                         ))}
//                         <hr />
//                         <h5>Total: ₹{getOrderTotal(order.items).toFixed(2)}</h5>

//                         {order.status === 'Preparing' && (
//                             <div className={orderStyle.preparing}>
//                                 <div className={orderStyle.preparing1}>
//                                     <div className={orderStyle.prepa}>Preparing</div>
//                                 </div>
//                                 <br />
//                                 <p>{order.customer}</p>
//                                 <p>{order.table}</p><br />
//                                 {order.items.map((item, idx) => (
//                                     <p key={idx}>
//                                         ₹{(item.price * item.quantity).toFixed(2)}
//                                     </p>
//                                 ))}
//                                 <button
//                                     className={orderStyle.mark}
//                                     onClick={() => handleStatusChange(order.id, 'Ready')}
//                                 >
//                                     Mark Ready
//                                 </button>
//                             </div>
//                         )}

//                         {order.status === 'Ready' && (
//                             <div className={orderStyle.ready}>
//                                 <div className={orderStyle.ready1}>Ready</div><br />
//                                 <p>{order.customer}</p>
//                                 <p>{order.table}</p><br />
//                                 {order.items.map((item, idx) => (
//                                     <p key={idx}>
//                                         ₹{(item.price * item.quantity).toFixed(2)}
//                                     </p>
//                                 ))}
//                                 <button
//                                     className={orderStyle.deliv}
//                                     onClick={() => handleStatusChange(order.id, 'Delivered')}
//                                 >
//                                     Delivered
//                                 </button>
//                             </div>
//                         )}

//                         {order.status === 'Delivered' && (
//                             <div className={orderStyle.Delive}>
//                                 <div className={orderStyle.Delive1}>Delivered</div><br />
//                                 <p>{order.customer}</p>
//                                 <p>{order.table}</p><br />
//                                 {order.items.map((item, idx) => (
//                                     <p key={idx}>
//                                         ₹{(item.price * item.quantity).toFixed(2)}
//                                     </p>
//                                 ))}<br /><br />
//                                 <i className="fa-solid fa-eye"></i>
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </header>
//         </div>
//     );
// };

// export default OrderManagement;
// >>>>>>> 87177930d92cd4c6b3036e94e60f006a2f98d825
