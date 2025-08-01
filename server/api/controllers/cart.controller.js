const { Users, CartItems, Items } = require('../models');


exports.addToCart = async (req, res) => {
    try {
        const { user_id, item_id, quantity } = req.body;

        if (!Number.isInteger(quantity) || quantity <= 0) {
            return res.status(400).json({ message: "Quantity must be a positive integer" });
        }

        const user = await Users.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const item = await Items.findByPk(item_id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        let cartItem = await CartItems.findOne({ where: { user_id, item_id } });

        if (cartItem) {
            cartItem.quantity += quantity;
            cartItem.amount = cartItem.quantity * item.price;
            await cartItem.save();
        } else {
            cartItem = await CartItems.create({ user_id, item_id, quantity, amount: quantity * item.price });
        }

        res.json({ message: 'Item added to cart', cartItem });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getCart = async (req, res) => {
    try {
        const { user_id } = req.params;
        const user = await Users.findByPk(user_id);

        if (!user) return res.status(404).json({ message: "User not found" });

        const cartItems = await CartItems.findAll({
            where: { user_id },
            include: [Items]
        });

        res.json({ items: cartItems });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.removeFromCart = async (req, res) => {
    try {
        const { cartItemId } = req.params;
        const cartItem = await CartItems.findByPk(cartItemId);

        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        await cartItem.destroy();
        res.json({ message: 'Item removed from cart' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.clearCart = async (req, res) => {
    try {
        const { user_id } = req.params;
        const cart = await Users.findByPk(user_id);
        if (!cart) return res.status(404).json({ message: "User Not found" });

        await CartItems.destroy({ where: { user_id } });
        res.json({ message: 'Cart cleared' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
