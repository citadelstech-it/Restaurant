const sequelize = require("../../config/database");
const OrderItems = require("./orderItems.model")
const Orders = require("./orders.model")
const Categories = require("./categories.model")
const Items = require("./items.model")
const Users = require("./users.model")
const CartItems = require("./cartsItems.model")

const db = {
    sequelize,
    OrderItems,
    Orders,
    Categories,
    Items,
    Users,
    CartItems
};

module.exports = db;