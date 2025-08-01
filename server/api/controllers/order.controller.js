const { Users, CartItems, Items, Orders, OrderItems, } = require('../models');


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
        const orders = await Orders.findAll({
            include: [{
                model: OrderItems,
                include: [Items]
            }]
        });
        res.json(orders);
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

