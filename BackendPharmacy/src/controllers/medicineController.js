const Medicine = require('../models/Medicine');
const { validationResult } = require('express-validator');

exports.getAllMedicines = (req, res) => {
  try {
    const medicines = Medicine.getAll();
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addMedicine = (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const result = Medicine.create(req.body);
    res.status(201).json({ id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMedicineStock = (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    
    const result = Medicine.updateStock(id, quantity);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Medicine not found' });
    }
    
    res.json({ message: 'Stock updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAlerts = (req, res) => {
  try {
    const lowStock = Medicine.getLowStock();
    const nearExpiry = Medicine.getNearExpiry();
    
    res.json({
      lowStock,
      nearExpiry
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};