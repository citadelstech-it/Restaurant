const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

router.post('/', cartController.addToCart);
router.get('/:user_id', cartController.getCart);
router.delete('/remove/:cartItemId', cartController.removeFromCart);
router.delete('/clear/:user_id', cartController.clearCart);

module.exports = router;
