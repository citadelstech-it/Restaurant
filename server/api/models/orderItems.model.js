const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const OrderItems = sequelize.define("OrderItems", {
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
});

module.exports = OrderItems;