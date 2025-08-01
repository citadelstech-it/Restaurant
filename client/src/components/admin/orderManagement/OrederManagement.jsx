import React, { useState } from 'react';
import orderStyle from '../../admin/orderManagement/OrederManagement.module.css';

const initialOrders = [
    {
        id: 'ORD006',
        date: '2025-08-01 13:45', 
        customer: 'Sundari',
        table: 'T-09',
        items: [
            { name: 'Chocolate Cake', quantity: 2, price: 50 },
            { name: 'Grilled Salmon', quantity: 1, price: 50 },
            { name: 'Beef Steak', quantity: 1, price: 65 }
          ],
        status: 'Preparing'
    },
    {
        id: 'ORD005',
        date: '2025-08-01 13:20', 
        customer: 'Bhanu',
        table: 'T-01',
        items: [
            { name: 'Chocolate Cake', quantity: 3, price: 50 },
            { name: 'Grilled Salmon', quantity: 1, price: 50 }
          ],
        status: 'Preparing'
    },
    {
        id: 'ORD004',
        date: '2025-08-01 13:00', 
        customer: 'Babu',
        table: 'T-03',
        items: [
            { name: 'Chocolate Cake', quantity: 2, price: 50 },
            { name: 'Beef Steak', quantity: 2, price: 65 }
          ],
        status: 'Ready'
    },
    {
        id: 'ORD003',
        date: '2025-08-01 14:30', 
        customer: 'John Smith',
        table: 'T-05',
        items: [{ name: 'Grilled Salmon', quantity: 2, price: 50 }],
        status: 'Ready'
    },
    {
        id: 'ORD002',
        date: '2025-08-01 14:25',
        customer: 'Sarah Johnson',
        table: 'T-12',
        items: [
            { name: 'Caesar Salad', quantity: 1, price: 30 },
            { name: 'Beef Steak', quantity: 1, price: 65 }
        ],
        status: 'Delivered'
    },
    {
        id: 'ORD001',
        date: '2025-08-01 14:15', 
        customer: 'Mike Brown',
        table: 'T-06',
        items: [{ name: 'Chocolate Cake', quantity: 2, price: 50 }
        ],
        status: 'Delivered'
    }
];



const OrederManagement = () => {
    const [orders, setOrders] = useState(initialOrders);
    const [filter, setFilter] = useState('All Orders');

    const handleStatusChange = (id, newStatus) => {
        const updatedOrders = orders.map(order =>
            order.id === id ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
    };
    const getOrderTotal = (items) =>
        items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const todayDate = new Date().toISOString().split("T")[0]; 

    const filteredOrders = orders.filter(order => {
        const orderDate = order.date.split(" ")[0]; 
        return (filter === 'All Orders' ? true : order.status === filter) && orderDate === todayDate;
    });


    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleRefresh = () => {
        setOrders([...initialOrders]); 
    };

    // const filteredOrders = orders.filter(order =>
    //     filter === 'All Orders' ? true : order.status === filter
    // );

    return (
        <div>
            <header>
                <div className={orderStyle.header}>
                    <h2>Order Management</h2>
                    <select className={orderStyle.order} onChange={handleFilterChange} value={filter}>
                        <option value="All Orders">All Orders</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Ready">Ready</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                    <button className={orderStyle.refre1} onClick={handleRefresh}>
                        <i className="fa-solid fa-arrows-rotate"></i> Refresh
                    </button>
                </div>

                {filteredOrders.map((order) => (
                    <div key={order.id} className={orderStyle.customen}>
                        <br />
                        <h4>{order.id}</h4>
                        <p>{order.date}</p>
                        <p>Customer</p>
                        <p>Table</p>
                        <hr />
                        <h5>Order Items:</h5>
                        {order.items.map((item, idx) => (
                            <p key={idx}>
                                {item.quantity}x {item.name} -
                            </p>
                        ))}

                        <hr />
                        <h5>Total: {getOrderTotal(order.items).toFixed(2)}</h5>


                        {order.status === 'Preparing' && (
                            <div className={orderStyle.preparing}>
                                <div className={orderStyle.preparing1}>
                                    <div className={orderStyle.prepa}>Preparing</div>
                                </div>
                                <br />
                                <p>{order.customer}</p>
                                <p>{order.table}</p><br />
                                {order.items.map((item, idx) => (
                                    <p key={idx}>
                                        {(item.price * item.quantity).toFixed(2)}
                                    </p>
                                ))}
                                <button
                                    className={orderStyle.mark}
                                    onClick={() => handleStatusChange(order.id, 'Ready')}
                                >
                                    Mark Ready
                                </button>
                            </div>
                        )}

                        {order.status === 'Ready' && (
                            <div className={orderStyle.ready}>
                                <div className={orderStyle.ready1}>Ready</div><br />
                                <p>{order.customer}</p>
                                <p>{order.table}</p><br />
                                {order.items.map((item, idx) => (
                                    <p key={idx}>
                                        {(item.price * item.quantity).toFixed(2)}
                                    </p>
                                ))}

                                <button
                                    className={orderStyle.deliv}
                                    onClick={() => handleStatusChange(order.id, 'Delivered')}
                                >
                                    Delivered
                                </button>
                            </div>
                        )}

                        {order.status === 'Delivered' && (
                            <div className={orderStyle.Delive}>
                                <div className={orderStyle.Delive1}>Delivered</div><br />
                                <p>{order.customer}</p>
                                <p>{order.table}</p><br />
                                {order.items.map((item, idx) => (
                                    <p key={idx}>
                                        {(item.price * item.quantity).toFixed(2)}
                                    </p>
                                ))}<br /><br />
                                <i className="fa-solid fa-eye"></i>
                            </div>
                        )}
                    </div>
                ))}
            </header>
        </div>
    );
};


export default OrederManagement;