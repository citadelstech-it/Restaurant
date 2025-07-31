const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.post('/checkout', orderController.checkout);
router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrderById);
router.put('/status/:id', orderController.ChangeStatus);

module.exports = router;
