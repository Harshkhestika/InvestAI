const express = require('express');
const router = express.Router();
const { 
  getSectors, 
  getAllCompanies, 
  getTopGrowingStocks, 
  getUpcomingIPOs,
  getDailyUpdates,
  getPrimaryMarket
} = require('../controllers/marketController');

// Public routes for market data
router.get('/sectors', getSectors);
router.get('/stocks', getAllCompanies);
router.get('/growing', getTopGrowingStocks);
router.get('/ipos', getUpcomingIPOs);
router.get('/updates', getDailyUpdates);
router.get('/primary', getPrimaryMarket);

module.exports = router;
