const defineAssociations = (db) => {
    db.Users.hasMany(db.CartItems, { foreignKey: 'user_id' });
    db.CartItems.belongsTo(db.Users, { foreignKey: 'user_id' });

    db.Items.hasMany(db.CartItems, { foreignKey: 'item_id' });
    db.CartItems.belongsTo(db.Items, { foreignKey: 'item_id' });

    db.Categories.hasMany(db.Items, { foreignKey: 'categoryId' });
    db.Items.belongsTo(db.Categories, { foreignKey: 'categoryId' });

    db.Orders.hasMany(db.OrderItems, { foreignKey: 'order_id' });
    db.OrderItems.belongsTo(db.Orders, { foreignKey: 'order_id' });

    db.Items.hasMany(db.OrderItems, { foreignKey: 'item_id' });
    db.OrderItems.belongsTo(db.Items, { foreignKey: 'item_id' });

}

module.exports = defineAssociations;