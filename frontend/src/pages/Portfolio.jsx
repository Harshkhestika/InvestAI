import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import DashboardLayout from '../components/DashboardLayout';
import API from '../services/api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './Portfolio.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Portfolio = () => {
  const [investments, setInvestments] = useState([]);
  const [formData, setFormData] = useState({ company: '', amount: '', buyingPrice: '', quantity: '' });
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    try {
      const { data } = await API.get('/portfolio');
      const enrichedData = data.map(inv => {
        // Deterministic random-like current price: -10% to +25%
        const charCode = inv.company.charCodeAt(0) || 0;
        const changePercent = (charCode + inv.company.length * 3) % 35 - 10;
        const mockCurrentPrice = inv.buyingPrice * (1 + (changePercent / 100));
        return {
          ...inv,
          mockCurrentPrice,
          changePercent
        };
      });
      setInvestments(enrichedData);
    } catch (error) {
      console.error('Error fetching investments:', error);
    }
  };

  const handleAddOrUpdateInvestment = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/portfolio/${editingId}`, { ...formData });
        setEditingId(null);
      } else {
        await API.post('/portfolio', { ...formData, date: new Date() });
      }
      setFormData({ company: '', amount: '', buyingPrice: '', quantity: '' });
      setIsModalOpen(false);
      fetchInvestments();
    } catch (error) {
      console.error('Error saving investment:', error);
    }
  };

  const handleEditClick = (inv) => {
    setEditingId(inv._id);
    setFormData({
      company: inv.company,
      amount: inv.amount,
      buyingPrice: inv.buyingPrice,
      quantity: inv.quantity
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this investment?')) return;
    try {
      await API.delete(`/portfolio/${id}`);
      fetchInvestments();
    } catch (error) {
      console.error('Error deleting investment:', error);
    }
  };

  const totalInvestment = investments.reduce((acc, curr) => acc + curr.amount, 0);
  const currentTotal = investments.reduce((acc, curr) => acc + (curr.mockCurrentPrice * curr.quantity), 0);
  
  const profitLoss = currentTotal - totalInvestment;
  const growth = totalInvestment ? ((profitLoss / totalInvestment) * 100).toFixed(2) : 0;



  const doughnutData = {
    labels: investments.map(i => i.company),
    datasets: [
      {
        data: investments.map(i => i.amount),
        backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <DashboardLayout title="Portfolio Management">
      <div className="portfolio-container">
        
        {/* Top Metrics Row */}
        <div className="dashboard-top-row">
          <div className="stat-card glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h4 style={{ marginBottom: '15px' }}>Total Investment</h4>
            <h2>₹{totalInvestment.toLocaleString()}</h2>
          </div>
          <div className="stat-card glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h4 style={{ marginBottom: '15px' }}>Current Value</h4>
            <h2>₹{currentTotal.toFixed(0).toLocaleString()}</h2>
          </div>
          <div className="stat-card glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h4 style={{ marginBottom: '15px' }}>Total Return</h4>
            <h2 className={profitLoss >= 0 ? 'text-success' : 'text-danger'}>
              {profitLoss >= 0 ? '+' : '-'}₹{Math.abs(profitLoss).toFixed(0).toLocaleString()} 
              <span style={{ fontSize: '1.2rem', marginLeft: '8px' }}>({growth}%)</span>
            </h2>
          </div>
          <div className="stat-card glass-panel flex-center" style={{ flexDirection: 'column', padding: '15px' }}>
            <h4 style={{ marginBottom: '10px' }}>Allocation</h4>
            <div style={{ height: '140px', width: '100%' }}>
              {investments.length > 0 ? (
                <Doughnut data={doughnutData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
              ) : (
                <div className="flex-center" style={{height:'100%', color: 'var(--text-secondary)'}}>No Data</div>
              )}
            </div>
          </div>
        </div>

        <div className="portfolio-content">
          <div className="portfolio-main">
            {/* Table */}
            <div className="table-container glass-panel mt-20">
              <div className="flex-between mb-20">
                <h3>Holdings</h3>
                <button 
                  className="btn-primary" 
                  onClick={() => {
                    setEditingId(null);
                    setFormData({ company: '', amount: '', buyingPrice: '', quantity: '' });
                    setIsModalOpen(true);
                  }}
                >
                  + Add Investment
                </button>
              </div>
              <table className="portfolio-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Investment</th>
                    <th>Qty</th>
                    <th>Buy Price</th>
                    <th>Current Price</th>
                    <th>P&L</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {investments.length === 0 ? (
                    <tr><td colSpan="7" className="text-center">No investments added yet</td></tr>
                  ) : (
                    investments.map((inv) => {
                      const pl = (inv.mockCurrentPrice - inv.buyingPrice) * inv.quantity;
                      const isProfit = pl >= 0;
                      return (
                        <tr key={inv._id}>
                          <td style={{ fontWeight: '600' }}>{inv.company}</td>
                          <td>₹{inv.amount.toLocaleString()}</td>
                          <td>{inv.quantity}</td>
                          <td>₹{inv.buyingPrice.toLocaleString()}</td>
                          <td>₹{inv.mockCurrentPrice.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                          <td>
                            <span className={isProfit ? 'text-success' : 'text-danger'} style={{ fontWeight: 'bold', padding: '4px 8px', background: isProfit ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', borderRadius: '4px' }}>
                              {isProfit ? '+' : ''}₹{Math.abs(pl).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})} ({isProfit ? '+' : ''}{inv.changePercent}%)
                            </span>
                          </td>
                          <td>
                            <div className="flex-center" style={{ gap: '15px' }}>
                              <FaEdit 
                                className="text-secondary" 
                                style={{ cursor: 'pointer' }} 
                                onClick={() => handleEditClick(inv)}
                                title="Edit Investment"
                              />
                              <FaTrash 
                                className="text-danger" 
                                style={{ cursor: 'pointer' }} 
                                onClick={() => handleDelete(inv._id)}
                                title="Delete Investment"
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => { setIsModalOpen(false); setEditingId(null); setFormData({ company: '', amount: '', buyingPrice: '', quantity: '' }); }}>
          <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
            <div className="add-investment-form">
              <div className="flex-between mb-20">
                <h3>{editingId ? 'Edit Investment' : 'Add Investment'}</h3>
                <button 
                  className="btn-secondary" 
                  style={{ padding: '6px 12px', fontSize: '0.9rem', border: 'none' }}
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingId(null);
                    setFormData({ company: '', amount: '', buyingPrice: '', quantity: '' });
                  }}
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleAddOrUpdateInvestment}>
                <div className="form-group">
                  <label>Company Name</label>
                  <input type="text" className="input-field" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Total Amount (₹)</label>
                  <input type="number" className="input-field" value={formData.amount} onChange={e => setFormData({...formData, amount: Number(e.target.value)})} required />
                </div>
                <div className="form-group">
                  <label>Buying Price (₹)</label>
                  <input type="number" className="input-field" value={formData.buyingPrice} onChange={e => setFormData({...formData, buyingPrice: Number(e.target.value)})} required />
                </div>
                <div className="form-group">
                  <label>Quantity</label>
                  <input type="number" className="input-field" value={formData.quantity} onChange={e => setFormData({...formData, quantity: Number(e.target.value)})} required />
                </div>
                <button type="submit" className="btn-primary w-100 mt-10">
                  {editingId ? 'Update Portfolio' : 'Add to Portfolio'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Portfolio;
