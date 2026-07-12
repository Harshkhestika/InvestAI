const express = require('express');
const router = express.Router();
const { analyzeCompany, chat, getChatHistory } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/analyze', protect, analyzeCompany);
router.post('/chat', protect, chat);
router.get('/chat-history', protect, getChatHistory);

module.exports = router;
