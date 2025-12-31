const express = require('express');
const { createOrder, getOrders } = require('../src/controllers/orderController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, createOrder);
router.get('/', authenticateToken, getOrders);

module.exports = router;