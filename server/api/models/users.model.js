const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Users = sequelize.define("Users", {
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Role: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Users;