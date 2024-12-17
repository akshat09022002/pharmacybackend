const express = require('express');
const orderController = require('../controllers/orderController');
const { orderValidators } = require('../utils/validators');

const router = express.Router();

router.get('/', orderController.getAllOrders);
router.post('/', orderValidators.create, orderController.createOrder);
router.patch('/:id/status', orderValidators.updateStatus, orderController.updateOrderStatus);

module.exports = router;