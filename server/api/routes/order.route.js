const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.post('/checkout', orderController.checkout);
router.get('/getOrders/', orderController.getOrders);
router.get('/getOrders/:id', orderController.getOrderById);
router.put('/status/:id', orderController.ChangeStatus);
router.get('/orderHistory', orderController.orderHistory);
router.get("/dashbaord",orderController.getDashboardData)


module.exports = router;
