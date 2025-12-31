const Order = require('../../models/Order');

const createOrder = async (req, res) => {
  try {
    const { items, total } = req.body;
    const userId = req.user.id;
    const order = await Order.create(userId, items, total);
    res.json({
      message: 'Order placed successfully',
      order_id: order.id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.getByUserId(userId);
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { createOrder, getOrders };