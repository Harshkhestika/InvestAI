import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import API from '../services/api';
import './AllStocks.css';

const AllStocks = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial stocks
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const { data } = await API.get('/market/stocks');
        setStocks(data);
      } catch (err) {
        console.error("Failed to fetch all stocks", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStocks();
  }, []);

  // Simulate live market updates every 3 seconds
  useEffect(() => {
    if (stocks.length === 0) return;

    const interval = setInterval(() => {
      setStocks(prevStocks => prevStocks.map(stock => {
        // Randomly decide to update this stock (30% chance per tick)
        if (Math.random() > 0.3) return stock;
        
        // Fluctuate price by -0.2% to +0.2%
        const fluctuation = 1 + (Math.random() * 0.004 - 0.002);
        const newPrice = stock.price * fluctuation;
        
        // Update change percentage
        const newChange = stock.change + (Math.random() * 0.1 - 0.05);

        return {
          ...stock,
          price: newPrice,
          change: newChange,
          _isBlinking: true // for CSS animation
        };
      }));

      // Remove blinking effect after 500ms
      setTimeout(() => {
        setStocks(prevStocks => prevStocks.map(s => ({ ...s, _isBlinking: false })));
      }, 500);

    }, 3000);

    return () => clearInterval(interval);
  }, [stocks.length]); // Only re-bind if length changes

  return (
    <DashboardLayout title="Live Indian Market Stocks">
      <div className="stocks-container glass-panel">
        <div className="flex-between mb-20">
          <p className="text-secondary">Comprehensive list of top Indian stocks across all sectors.</p>
          <div className="live-indicator flex-center" style={{ gap: '8px', fontSize: '0.9rem', color: 'var(--success)' }}>
            <span className="live-dot" style={{ background: 'var(--success)', width: '8px', height: '8px', borderRadius: '50%', animation: 'pulse 2s infinite' }}></span>
            Live Updates Active
          </div>
        </div>

        {loading ? (
          <div className="flex-center mt-40">Loading stock data...</div>
        ) : (
          <div className="table-responsive">
            <table className="stocks-table">
              <thead>
                <tr>
                  <th>Company (Ticker)</th>
                  <th>Sector</th>
                  <th>Industry</th>
                  <th className="text-right">Price (₹)</th>
                  <th className="text-right">Change (%)</th>
                  <th className="text-right">Volume</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((stock) => (
                  <tr key={stock.id} className={stock._isBlinking ? 'flash-update' : ''}>
                    <td>
                      <div className="company-info-td">
                        <strong>{stock.name}</strong>
                        <span className="text-secondary" style={{ fontSize: '0.8rem', marginLeft: '8px' }}>{stock.id}</span>
                      </div>
                    </td>
                    <td>
                      <span className="flex-center" style={{ gap: '6px', justifyContent: 'flex-start' }}>
                        {stock.sectorIcon} {stock.sector}
                      </span>
                    </td>
                    <td className="text-secondary">{stock.industry}</td>
                    <td className="text-right font-bold">₹{stock.price.toFixed(2)}</td>
                    <td className={`text-right font-bold ${stock.change >= 0 ? 'text-success' : 'text-danger'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                    </td>
                    <td className="text-right text-secondary">{stock.volume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AllStocks;
