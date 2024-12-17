const { body } = require('express-validator');
const { isValidDate } = require('./dateUtils');

const medicineValidators = {
  create: [
    body('name').notEmpty().trim().withMessage('Medicine name is required'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
    body('minimum_stock').isInt({ min: 0 }).withMessage('Minimum stock must be a non-negative integer'),
    body('expiry_date')
      .custom(isValidDate)
      .withMessage('Invalid expiry date format. Use YYYY-MM-DD')
  ]
};

const orderValidators = {
  create: [
    body('medicine_id').isInt().withMessage('Valid medicine ID is required'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
  ],
  updateStatus: [
    body('status')
      .isIn(['pending', 'completed', 'cancelled'])
      .withMessage('Invalid status value')
  ]
};

module.exports = {
  medicineValidators,
  orderValidators
};