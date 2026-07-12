const express = require('express');
const router = express.Router();
const { getMarketNews } = require('../controllers/newsController');

// Public route to get market news
router.get('/', getMarketNews);

module.exports = router;
