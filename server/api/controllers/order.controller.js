const { Users, CartItems, Items, Orders, OrderItems, Categories } = require('../models');
const { Op } = require('sequelize');

async function generateOrderId() {
    const lastOrder = await Orders.findOne({
        order: [['id', 'DESC']]
    });

    let nextNumber = 1;
    if (lastOrder && lastOrder.Order_Id) {
        const lastNumber = parseInt(lastOrder.Order_Id.replace('ORD-', ''), 10);
        nextNumber = lastNumber + 1;
    }

    const padded = String(nextNumber).padStart(4, '0');
    return `ORD-${padded}`;
}

exports.checkout = async (req, res) => {
    const { user_id, customer_name, customer_email, customer_phone, paymentMethod } = req.body;

    try {
        const cart = await Users.findByPk(user_id, {
            include: [{ model: CartItems, include: [Items] }]
        });

        if (!cart || cart.CartItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        let totalPrice = 0;
        cart.CartItems.forEach(ci => {
            totalPrice += ci.amount;
        });

        let gstAmount = (totalPrice * 18) / 100

        let totalAmount = totalPrice + gstAmount

        let Order_Id = await generateOrderId()
        console.log(Order_Id, "order_id")

        const order = await Orders.create({
            Order_Id,
            customer_name,
            customer_email,
            customer_phone,
            total: totalPrice,
            GST: gstAmount,
            GrandTotal: totalAmount,
            status: 'pending',
            paymentMethod
        });

        for (const ci of cart.CartItems) {
            console.log(ci, "from")
            await OrderItems.create({
                order_id: order.id,
                item_id: ci.item_id,
                quantity: ci.quantity,
                amount: ci.amount
            });
            let selectedItem = await Items.findByPk(ci.item_id);
            selectedItem.inStock -= ci.quantity;
            await selectedItem.save();
        }

        await CartItems.destroy({ where: { user_id } });

        res.json({ message: 'Order placed successfully', order });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        // Get today's start and end times (00:00 to 23:59)
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date();
        end.setHours(23, 59, 59, 999);

        const { count, rows: orders } = await Orders.findAndCountAll({
            where: {
                createdAt: {
                    [Op.between]: [start, end]
                }
            },
            offset,
            limit,
            order: [['createdAt', 'DESC']],
            include: [{
                model: OrderItems,
                include: [Items]
            }]
        });

        res.json({
            orders,
            totalOrders: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit)
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Orders.findOne({
            where: { id },
            include: [{
                model: OrderItems,
                include: [Items]
            }]
        });

        if (!order) return res.status(404).json({ message: 'Order not found' });

        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.ChangeStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body
        let selectedOrder = await Orders.findByPk(id)
        if (!selectedOrder) return res.status(404).json({ message: 'Order not found' });
        selectedOrder.status = status
        await selectedOrder.save()
        res.json(selectedOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.orderHistory = async (req, res) => {
    try {
        const { order_id, order_date } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        let where = {};

        if (order_id) {
            where.Order_Id = { [Op.like]: `%${order_id}%` };
        }

        if (order_date) {
            const start = new Date(order_date);
            start.setHours(0, 0, 0, 0);
            const end = new Date(order_date);
            end.setHours(23, 59, 59, 999);
            where.createdAt = { [Op.between]: [start, end] };
        }

        const { count, rows: orders } = await Orders.findAndCountAll({
            where,
            offset,
            limit,
            order: [['createdAt', 'DESC']],
            include: [{
                model: OrderItems,
                include: [Items]
            }]
        });

        res.json({
            orders,
            totalOrders: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit)
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getDashboardData = async (req, res) => {
    try {
        // Total revenue (sum of GrandTotal for all orders)
        const totalRevenueResult = await Orders.findAll({
            attributes: [
                [require('sequelize').fn('SUM', require('sequelize').col('GrandTotal')), 'totalRevenue']
            ]
        });
        const totalRevenue = parseFloat(totalRevenueResult[0].get('totalRevenue')) || 0;

        // Total orders count
        const totalOrders = await Orders.count();

        // Menu items count
        const menuItemsCount = await Items.count();

        // Low stock item count (<= 10)
        const lowStockCount = await Items.count({
            where: {
                inStock: { [require('sequelize').Op.lte]: 10 }
            }
        });

        // Recent orders (limit 3, latest first)
        const recentOrders = await Orders.findAll({
            limit: 3,
            order: [['createdAt', 'DESC']],
            include: [{
                model: OrderItems,
                include: [Items]
            }]
        });

        // Low stock alert items (<= 10)
        const lowStockItems = await Items.findAll({
            where: {
                inStock: { [require('sequelize').Op.lte]: 10 }
            },
            include: [{ model: Categories }]
        });

        res.json({
            totalRevenue,
            totalOrders,
            menuItemsCount,
            lowStockCount,
            recentOrders,
            lowStockItems
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};