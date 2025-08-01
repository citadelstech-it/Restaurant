const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Items = sequelize.define("Items", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    inStock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagePublicId: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Items;