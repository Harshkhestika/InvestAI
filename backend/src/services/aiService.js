// In a real application, you would use LangChain.js and the official Gemini API SDK.
// Since we don't have active keys and to ensure this boilerplate works, we will simulate the AI responses.

const analyzeStock = async (companyName) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Basic heuristic to detect non-stock queries for this mock
  const nonStockKeywords = ['iphone', 'macbook', 'shoe', 'car', 'phone', 'laptop', 'food', 'pizza', 'product', 'watch', 'clothes', 'water'];
  const lowerQuery = companyName.toLowerCase();
  
  if (nonStockKeywords.some(kw => lowerQuery.includes(kw))) {
    throw new Error(`"${companyName}" appears to be a product or general item, not a publicly traded stock. Please search for a valid company or ticker symbol.`);
  }
  
  // Dummy data generated for the company to mock a premium AI analysis
  const basePrice = (Math.random() * (3500 - 150) + 150).toFixed(2);
  const changePercent = (Math.random() * (5 - (-5)) + (-5)).toFixed(2);
  
  return {
    company: companyName,
    ticker: companyName.substring(0, 4).toUpperCase(),
    currentPrice: parseFloat(basePrice),
    changePercent: parseFloat(changePercent),
    score: Math.floor(Math.random() * (95 - 60) + 60), // Random score between 60-95
    fundamentals: {
      marketCap: '₹' + (Math.random() * (800000 - 5000) + 5000).toFixed(0) + ' Cr',
      peRatio: (Math.random() * (80 - 10) + 10).toFixed(2),
      range52Week: `₹${(basePrice * 0.7).toFixed(2)} - ₹${(basePrice * 1.2).toFixed(2)}`,
      eps: '₹' + (Math.random() * (150 - 5) + 5).toFixed(2),
      revenueGrowth: (Math.random() * (35 - 5) + 5).toFixed(1) + '% (YoY)',
      debtToEquity: (Math.random() * (2.5 - 0.1) + 0.1).toFixed(2),
      dividendYield: (Math.random() * (5 - 0.5) + 0.5).toFixed(2) + '%',
      roe: (Math.random() * (30 - 8) + 8).toFixed(2) + '%',
      pbRatio: (Math.random() * (10 - 1) + 1).toFixed(2),
      beta: (Math.random() * (2 - 0.5) + 0.5).toFixed(2),
      volume: (Math.random() * (15 - 1) + 1).toFixed(1) + 'M',
      netMargin: (Math.random() * (25 - 5) + 5).toFixed(2) + '%'
    },
    about: `${companyName} is a leading enterprise in its sector, known for its robust operational efficiency and consistent value creation. With a strong presence in both domestic and international markets, the company has recently invested heavily in next-generation technologies to expand its competitive moat and ensure long-term sustainable growth.`,
    aiRecommendation: {
      action: changePercent > 0 ? (changePercent > 3 ? 'STRONG BUY' : 'BUY') : (changePercent < -2 ? 'SELL' : 'HOLD'),
      targetPrice: parseFloat((basePrice * (1 + (Math.random() * 0.2 - 0.05))).toFixed(2)),
      suggestedInvestment: Math.random() > 0.5 ? 'Invest ₹50,000' : 'Allocate 5% of Portfolio',
      reasoning: `Based on a deep neural network analysis of ${companyName}'s current P/E ratio, recent quarterly earnings, and broader sector momentum, the asset is currently ${changePercent > 0 ? 'undervalued' : 'trading near resistance'}. The AI algorithms project a target of ₹${(basePrice * 1.15).toFixed(2)} within a 6-month horizon, making this a strategic entry point.`
    }
  };
};

const chatWithAssistant = async (question) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (question.toLowerCase().includes('infosys')) {
    return "Infosys has stable revenue growth. Risk level is low. Long-term investors may consider it.";
  }
  
  return `Based on market analysis, the outlook for your query seems positive, but always consider market volatility.`;
};

module.exports = {
  analyzeStock,
  chatWithAssistant,
};
