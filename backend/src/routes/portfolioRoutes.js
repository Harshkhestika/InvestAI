const express = require('express');
const router = express.Router();
const { addInvestment, getInvestments, updateInvestment, deleteInvestment } = require('../controllers/portfolioController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, addInvestment)
  .get(protect, getInvestments);

router.route('/:id')
  .put(protect, updateInvestment)
  .delete(protect, deleteInvestment);

module.exports = router;
