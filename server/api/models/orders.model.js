const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Orders = sequelize.define("Orders", {
    Order_Id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    customer_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    customer_email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    customer_phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    GST: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    GrandTotal: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true
    },
    paymentStatus: {
        type: DataTypes.STRING,
        allowNull: true
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Orders;