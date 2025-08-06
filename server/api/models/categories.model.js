const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Categories = sequelize.define("Categories", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Categories;
