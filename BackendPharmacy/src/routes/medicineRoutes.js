const express = require('express');
const medicineController = require('../controllers/medicineController');
const { medicineValidators } = require('../utils/validators');

const router = express.Router();

router.get('/', medicineController.getAllMedicines);
router.post('/', medicineValidators.create, medicineController.addMedicine);
router.patch('/:id/stock', medicineController.updateMedicineStock);
router.get('/alerts', medicineController.getAlerts);

module.exports = router;