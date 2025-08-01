const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');
const upload = require('../../middleware/upload');

router.post('/', upload.single('image'), itemController.addItem);
router.get('/', itemController.getItems);
router.put('/:id', upload.single('image'), itemController.updateItem);
router.delete('/:id', itemController.deleteItem);

module.exports = router;
