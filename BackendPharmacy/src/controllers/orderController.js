const Order = require('../models/Order');
const Medicine = require('../models/Medicine');
const { validationResult } = require('express-validator');

exports.createOrder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { medicine_id, quantity } = req.body;
    const medicine = Medicine.getById(medicine_id);

    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }

    if (medicine.stock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    const order = Order.create({
      medicine_id,
      quantity,
      status: 'pending'
    });

    Medicine.updateStock(medicine_id, -quantity);

    res.status(201).json({ id: order.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllOrders = (req, res) => {
  try {
    const orders = Order.getAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrderStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = Order.updateStatus(id, status);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ message: 'Order status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};