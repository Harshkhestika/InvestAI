const aiService = require('../services/aiService');
const ChatHistory = require('../models/ChatHistory');

const analyzeCompany = async (req, res) => {
  const { company } = req.body;
  
  if (!company) {
    return res.status(400).json({ message: 'Company name is required' });
  }

  try {
    const analysis = await aiService.analyzeStock(company);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const chat = async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ message: 'Question is required' });
  }

  try {
    const answer = await aiService.chatWithAssistant(question);
    
    // Attempt to save to history if user is authenticated (assuming protect middleware is used)
    if (req.user) {
      let chatHistory = await ChatHistory.findOne({ userId: req.user.id });
      if (!chatHistory) {
        chatHistory = new ChatHistory({ userId: req.user.id, messages: [] });
      }
      chatHistory.messages.push({ question, answer });
      await chatHistory.save();
    }
    
    res.json({ answer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getChatHistory = async (req, res) => {
  try {
    const history = await ChatHistory.findOne({ userId: req.user.id });
    res.json(history ? history.messages : []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  analyzeCompany,
  chat,
  getChatHistory
};
