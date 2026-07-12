const marketData = require('../data/marketData');

// Helper to flatten all stocks
const getAllStocks = () => {
  let allStocks = [];
  marketData.sectors.forEach(sector => {
    sector.industries.forEach(industry => {
      industry.companies.forEach(company => {
        allStocks.push({
          ...company,
          sector: sector.name,
          industry: industry.name,
          sectorIcon: sector.icon
        });
      });
    });
  });
  return allStocks;
};

const getSectors = (req, res) => {
  try {
    res.json(marketData.sectors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch sectors" });
  }
};

const getAllCompanies = (req, res) => {
  try {
    res.json(getAllStocks());
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all stocks" });
  }
};

const getTopGrowingStocks = (req, res) => {
  try {
    const allStocks = getAllStocks();
    // Sort by change percentage descending to simulate "top growing"
    const topGrowing = allStocks.sort((a, b) => b.change - a.change).slice(0, 5);
    res.json(topGrowing);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch top growing stocks" });
  }
};

const getUpcomingIPOs = (req, res) => {
  try {
    res.json(marketData.upcomingIPOs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch upcoming IPOs" });
  }
};

const getDailyUpdates = (req, res) => {
  try {
    res.json(marketData.dailyUpdates);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch daily updates" });
  }
};

const getPrimaryMarket = (req, res) => {
  try {
    res.json(marketData.primaryMarket);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch primary market data" });
  }
};

module.exports = {
  getSectors,
  getAllCompanies,
  getTopGrowingStocks,
  getUpcomingIPOs,
  getDailyUpdates,
  getPrimaryMarket
};
