require("dotenv").config();
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express();
const defineAssociations = require("./api/init_models/associations");
const sequelize = require("./config/database");
const db = require("./api/models/index");
const cartRoutes = require('./api/routes/cart.route');
const orderRoutes = require('./api/routes/order.route')
const categoryRoutes = require('./api/routes/category.route')
const itemRoutes = require('./api/routes/item.route')
const userRoutes = require('./api/routes/user.route');

const PORT = process.env.PORT || 5000;
corsOpts = {
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}
app.use(cors(corsOpts))
app.use(bodyParser.json())
defineAssociations(db)

app.get("/", (req, res) => {
    try {
        res.send("welcome to the user APIs")
    }
    catch (err) {
        console.log(err)
    }
})

app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/items', itemRoutes)
app.use('/api/users', userRoutes);

sequelize.sync().then(() => {
    console.log("DB Synced");
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
});
