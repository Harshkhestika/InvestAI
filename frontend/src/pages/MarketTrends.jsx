import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import API from '../services/api';
import { motion } from 'framer-motion';
import { FaArrowUp, FaRocket, FaClock, FaCheckCircle, FaSpinner, FaChartLine, FaLandmark, FaLaptop, FaHeartbeat, FaCar, FaShoppingCart, FaBolt, FaGasPump, FaSatelliteDish, FaHardHat, FaTools, FaRegNewspaper, FaTimes, FaChevronDown, FaChevronUp, FaMoneyBillWave } from 'react-icons/fa';
import './MarketTrends.css';

const getSectorIcon = (sectorName) => {
  if (sectorName.includes('Banking')) return <FaLandmark className="text-primary" />;
  if (sectorName.includes('IT')) return <FaLaptop className="text-success" />;
  if (sectorName.includes('Pharma')) return <FaHeartbeat className="text-danger" />;
  if (sectorName.includes('Auto')) return <FaCar className="text-primary" />;
  if (sectorName.includes('FMCG')) return <FaShoppingCart className="text-warning" />;
  if (sectorName.includes('Power')) return <FaBolt className="text-warning" />;
  if (sectorName.includes('Oil')) return <FaGasPump className="text-danger" />;
  if (sectorName.includes('Telecom')) return <FaSatelliteDish className="text-primary" />;
  if (sectorName.includes('Infra')) return <FaHardHat className="text-warning" />;
  if (sectorName.includes('Metals')) return <FaTools className="text-secondary" />;
  return <FaChartLine className="text-primary" />;
};

const MarketTrends = () => {
  const [primaryMarket, setPrimaryMarket] = useState([]);
  const [ipos, setIpos] = useState([]);
  const [dailyUpdates, setDailyUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIpo, setSelectedIpo] = useState(null);
  const [expandedSection, setExpandedSection] = useState('growing'); // Default open section

  useEffect(() => {
    const fetchTrendsData = async () => {
      try {
        const [primaryRes, ipoRes, updatesRes] = await Promise.all([
          API.get('/market/primary'),
          API.get('/market/ipos'),
          API.get('/market/updates')
        ]);
        setPrimaryMarket(primaryRes.data);
        setIpos(ipoRes.data);
        setDailyUpdates(updatesRes.data);
      } catch (err) {
        console.error("Failed to fetch market trends", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrendsData();
  }, []);

  const getStatusIcon = (status) => {
    if (status.includes('Approved') || status.includes('Listed')) return <FaCheckCircle className="text-success" />;
    if (status.includes('Pending') || status.includes('Delayed')) return <FaClock className="text-warning" />;
    return <FaSpinner className="text-primary" />;
  };

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <DashboardLayout title="Market Trends & Insights">
      <div className="trends-container">
        
        {loading ? (
          <div className="flex-center mt-40">Loading trends data...</div>
        ) : (
          <div className="trends-accordion-container">
            
            {/* Upcoming IPOs Section */}
            <div className="trend-section glass-panel mb-20">
              <div 
                className="section-header flex-between" 
                onClick={() => toggleSection('ipos')}
                style={{ cursor: 'pointer', padding: '15px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}
              >
                <div className="flex-center" style={{ gap: '15px' }}>
                  <h3 className="section-title m-0">
                    <FaRocket className="text-primary" /> Upcoming IPOs
                  </h3>
                  <span className="badge">Equities</span>
                </div>
                <div className="text-secondary" style={{ fontSize: '1.2rem' }}>
                  {expandedSection === 'ipos' ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
              
              {expandedSection === 'ipos' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="section-body p-20"
                >
                  <div className="trends-list-grid">
                    {ipos.map((ipo, index) => (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        key={index} 
                        className="ipo-card"
                      >
                        <div className="flex-between mb-20">
                          <h4 className="ipo-name m-0">{ipo.name}</h4>
                          <span className="status-badge flex-center" style={{ gap: '6px' }}>
                            {getStatusIcon(ipo.status)} {ipo.status}
                          </span>
                        </div>
                        
                        <div className="ipo-details-grid mb-15">
                          <div className="ipo-detail-item">
                            <span className="text-secondary text-sm">Issue Size</span>
                            <div className="font-bold">{ipo.issueSize}</div>
                          </div>
                          <div className="ipo-detail-item">
                            <span className="text-secondary text-sm">Price Band</span>
                            <div className="font-bold">{ipo.issuePrice}</div>
                          </div>
                          <div className="ipo-detail-item">
                            <span className="text-secondary text-sm">Open Date</span>
                            <div className="font-bold">{ipo.openDate}</div>
                          </div>
                        </div>
                        
                        <button className="btn-primary w-100" onClick={() => setSelectedIpo(ipo)}>
                          Check Details
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Primary Market (NFOs & Bonds) Section */}
            <div className="trend-section glass-panel mb-20">
              <div 
                className="section-header flex-between" 
                onClick={() => toggleSection('primary')}
                style={{ cursor: 'pointer', padding: '15px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}
              >
                <div className="flex-center" style={{ gap: '15px' }}>
                  <h3 className="section-title m-0">
                    <FaMoneyBillWave className="text-success" /> Primary Market
                  </h3>
                  <span className="badge">NFOs & Bonds</span>
                </div>
                <div className="text-secondary" style={{ fontSize: '1.2rem' }}>
                  {expandedSection === 'primary' ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
              
              {expandedSection === 'primary' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="section-body p-20"
                >
                  <div className="trends-list-grid">
                    {primaryMarket.map((item, index) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        key={item.id} 
                        className="trend-card"
                      >
                        <div className="flex-between mb-15">
                          <div>
                            <span className={`status-badge ${item.type === 'NFO' ? 'text-primary' : 'text-warning'}`} style={{ fontSize: '0.7rem', padding: '2px 6px', marginBottom: '8px', display: 'inline-block' }}>{item.type}</span>
                            <h4 className="stock-name m-0">{item.name}</h4>
                            <span className="stock-sector text-secondary">{item.category}</span>
                          </div>
                        </div>
                        <div className="ipo-details-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '10px', background: 'transparent', padding: '0', border: 'none' }}>
                          <div className="ipo-detail-item">
                            <span className="text-secondary text-sm">{item.type === 'NFO' ? 'Min Invest' : 'Yield'}</span>
                            <div className="font-bold">{item.type === 'NFO' ? item.minInvestment : item.yield}</div>
                          </div>
                          <div className="ipo-detail-item">
                            <span className="text-secondary text-sm">Close Date</span>
                            <div className="font-bold">{item.closeDate}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Daily Market Updates Section */}
            <div className="trend-section glass-panel mb-20">
              <div 
                className="section-header flex-between" 
                onClick={() => toggleSection('updates')}
                style={{ cursor: 'pointer', padding: '15px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}
              >
                <div className="flex-center" style={{ gap: '15px' }}>
                  <h3 className="section-title m-0">
                    <FaRegNewspaper className="text-warning" /> Daily Updates
                  </h3>
                  <span className="badge">News</span>
                </div>
                <div className="text-secondary" style={{ fontSize: '1.2rem' }}>
                  {expandedSection === 'updates' ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
              
              {expandedSection === 'updates' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="section-body p-20"
                >
                  <div className="trends-list-grid">
                    {dailyUpdates.map((update, index) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        key={update.id} 
                        className="update-card"
                      >
                        <div className="flex-between mb-10">
                          <span className={`update-impact ${update.impact.toLowerCase()}`}>{update.type}</span>
                          <span className="text-secondary text-sm flex-center" style={{gap:'5px'}}><FaClock size={10} /> {update.time}</span>
                        </div>
                        <h4 className="m-0" style={{ fontSize: '1.05rem', lineHeight: '1.4' }}>{update.title}</h4>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

          </div>
        )}

        {/* IPO Details Modal */}
        {selectedIpo && (
          <div className="modal-overlay flex-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="modal-content glass-panel"
            >
              <div className="modal-header flex-between mb-20">
                <h2 className="m-0">{selectedIpo.name}</h2>
                <button className="icon-btn" onClick={() => setSelectedIpo(null)}><FaTimes /></button>
              </div>
              
              <div className="modal-body">
                <div className="flex-between mb-20">
                  <span className="status-badge flex-center" style={{ gap: '6px' }}>
                    {getStatusIcon(selectedIpo.status)} {selectedIpo.status}
                  </span>
                  <span className="font-bold text-secondary">Open Date: {selectedIpo.openDate}</span>
                </div>

                <div className="ipo-details-grid mb-25">
                  <div className="ipo-detail-item">
                    <span className="text-secondary text-sm">Issue Size</span>
                    <div className="font-bold">{selectedIpo.issueSize}</div>
                  </div>
                  <div className="ipo-detail-item">
                    <span className="text-secondary text-sm">Price Band</span>
                    <div className="font-bold">{selectedIpo.issuePrice}</div>
                  </div>
                  <div className="ipo-detail-item">
                    <span className="text-secondary text-sm">Lot Size</span>
                    <div className="font-bold">{selectedIpo.lotSize || 'TBA'}</div>
                  </div>
                </div>
                
                <h4 className="mb-10 text-gradient">About the Company</h4>
                <p className="text-secondary" style={{ lineHeight: '1.7', fontSize: '1.05rem' }}>
                  {selectedIpo.about || 'Information is not available at the moment.'}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MarketTrends;
