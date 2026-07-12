import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { motion } from 'framer-motion';
import { FaSearch, FaDownload, FaChartLine, FaRobot, FaMoneyBillWave, FaArrowUp, FaArrowDown, FaBuilding } from 'react-icons/fa';
import DashboardLayout from '../components/DashboardLayout';
import API from '../services/api';
import './Analysis.css';

const Analysis = () => {
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!company.trim()) return;
    setLoading(true);
    setError('');
    
    try {
      const { data } = await API.post('/ai/analyze', { company });
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching analysis');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const input = document.getElementById('report-content');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${result.company}_AI_Analysis.pdf`);
    });
  };

  const renderMetricCard = (label, value) => (
    <div className="metric-card">
      <span className="metric-label">{label}</span>
      <strong className="metric-value">{value}</strong>
    </div>
  );

  return (
    <DashboardLayout title="AI Expert Analysis">
      <div className="analysis-container">
        
        {/* Terminal Style Search Bar (Redesigned with inline button) */}
        <div className="search-terminal mb-30">
          <form onSubmit={handleAnalyze} className="search-form">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search Company Name or Ticker (e.g. RELIANCE, TCS)..." 
              className="terminal-input" 
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <button type="submit" className="btn-search-inside" disabled={loading}>
              {loading ? (
                <span className="flex-center" style={{gap: '8px'}}><div className="spinner-small"></div> Analyzing</span>
              ) : (
                <span className="flex-center" style={{gap: '8px'}}>Analyze <FaRobot /></span>
              )}
            </button>
          </form>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="error-box glass-panel mb-20">
            {error}
          </motion.div>
        )}

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="report-wrapper"
          >
            <div className="flex-between mb-20">
              <h3 className="section-title text-gradient">AI Diagnostic Report</h3>
              <button className="btn-secondary flex-center" onClick={downloadPDF} style={{gap: '8px'}}>
                <FaDownload /> Export PDF
              </button>
            </div>
            
            <div id="report-content" className="report-content">
              
              {/* TWO COLUMN DASHBOARD LAYOUT */}
              <div className="analysis-layout-grid">
                
                {/* LEFT COLUMN: Data */}
                <div className="analysis-left-col">
                  {/* Company Header */}
                  <div className="company-header glass-panel mb-20 flex-between">
                    <div>
                      <div className="flex-center" style={{gap: '12px', marginBottom: '8px'}}>
                        <div className="company-icon flex-center"><FaBuilding /></div>
                        <h2 className="m-0">{result.company}</h2>
                        <span className="ticker-badge">{result.ticker}</span>
                      </div>
                      <div className="score-badge">AI Confidence: <strong>{result.score}/100</strong></div>
                    </div>
                    
                    <div className="price-display text-right">
                      <h1 className="m-0">₹{result.currentPrice}</h1>
                      <div className={`price-change flex-center justify-end ${result.changePercent >= 0 ? 'text-success' : 'text-danger'}`}>
                        {result.changePercent >= 0 ? <FaArrowUp size={14} /> : <FaArrowDown size={14} />}
                        {Math.abs(result.changePercent)}%
                      </div>
                    </div>
                  </div>

                  {/* About Section */}
                  <div className="about-section glass-panel p-20 mb-20">
                    <h4 className="mb-10 text-primary">About {result.company}</h4>
                    <p className="m-0 text-secondary" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
                      {result.about}
                    </p>
                  </div>

                  {/* Fundamentals Grid */}
                  <div className="fundamentals-section glass-panel p-20">
                    <h4 className="mb-20 flex-center" style={{gap: '8px'}}><FaChartLine className="text-primary"/> Financial Fundamentals</h4>
                    <div className="metrics-grid">
                      {renderMetricCard('Market Cap', result.fundamentals.marketCap)}
                      {renderMetricCard('P/E Ratio', result.fundamentals.peRatio)}
                      {renderMetricCard('52-Wk Range', result.fundamentals.range52Week)}
                      {renderMetricCard('EPS', result.fundamentals.eps)}
                      {renderMetricCard('Rev Growth', result.fundamentals.revenueGrowth)}
                      {renderMetricCard('Debt/Equity', result.fundamentals.debtToEquity)}
                      {renderMetricCard('Div Yield', result.fundamentals.dividendYield)}
                      {renderMetricCard('ROE', result.fundamentals.roe)}
                      {renderMetricCard('P/B Ratio', result.fundamentals.pbRatio)}
                      {renderMetricCard('Beta', result.fundamentals.beta)}
                      {renderMetricCard('Volume', result.fundamentals.volume)}
                      {renderMetricCard('Net Margin', result.fundamentals.netMargin)}
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: AI Verdict */}
                <div className="analysis-right-col">
                  <div className={`ai-verdict-card full-height ${result.aiRecommendation.action.includes('BUY') ? 'verdict-buy' : result.aiRecommendation.action === 'SELL' ? 'verdict-sell' : 'verdict-hold'}`}>
                    
                    <div className="verdict-header flex-between mb-30">
                      <div className="flex-center" style={{gap: '12px'}}>
                        <div className="ai-icon-large flex-center"><FaRobot size={24}/></div>
                        <div>
                          <span className="text-sm opacity-80 uppercase tracking-wide">AI Recommendation</span>
                          <h2 className="m-0 verdict-action mt-5">{result.aiRecommendation.action}</h2>
                        </div>
                      </div>
                    </div>
                    
                    <div className="target-price-box mb-20 text-center">
                       <span className="text-sm opacity-80 uppercase tracking-wide">6-Month Target Price</span>
                       <h1 className="m-0 mt-5 text-gradient-light">₹{result.aiRecommendation.targetPrice}</h1>
                    </div>

                    <div className="investment-suggestion flex-center mb-20" style={{flexDirection: 'column', textAlign: 'center'}}>
                      <FaMoneyBillWave size={28} className="mb-10 text-primary" style={{filter: 'brightness(1.5)'}} /> 
                      <span className="text-sm opacity-80 mb-5">Suggested Action</span>
                      <strong style={{fontSize: '1.4rem'}}>{result.aiRecommendation.suggestedInvestment}</strong>
                    </div>

                    <div className="verdict-reasoning mt-auto">
                      <p className="m-0 text-sm" style={{ lineHeight: '1.6' }}>
                        {result.aiRecommendation.reasoning}
                      </p>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Analysis;
