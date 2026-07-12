import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import API from '../services/api';
import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaLandmark, FaLaptop, FaHeartbeat, FaCar, FaShoppingCart, FaBolt, FaGasPump, FaSatelliteDish, FaHardHat, FaTools } from 'react-icons/fa';
import './InvestmentSectors.css';

const getSectorIcon = (id, fallback) => {
  switch (id) {
    case 'banking': return <FaLandmark className="text-primary" />;
    case 'it': return <FaLaptop className="text-success" />;
    case 'pharma': return <FaHeartbeat className="text-danger" />;
    case 'auto': return <FaCar className="text-primary" />;
    case 'fmcg': return <FaShoppingCart className="text-warning" />;
    case 'power': return <FaBolt className="text-warning" />;
    case 'oil-gas': return <FaGasPump className="text-danger" />;
    case 'telecom': return <FaSatelliteDish className="text-primary" />;
    case 'infrastructure': return <FaHardHat className="text-warning" />;
    case 'metals': return <FaTools className="text-secondary" />;
    default: return fallback;
  }
};

const InvestmentSectors = () => {
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSector, setExpandedSector] = useState(null);

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const { data } = await API.get('/market/sectors');
        setSectors(data);
      } catch (err) {
        console.error("Failed to fetch sectors", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSectors();
  }, []);

  const toggleSector = (id) => {
    if (expandedSector === id) {
      setExpandedSector(null);
    } else {
      setExpandedSector(id);
    }
  };

  return (
    <DashboardLayout title="Popular Investment Sectors in India">
      <div className="sectors-container">
        <p className="text-secondary mb-20">These are the sectors most investors follow:</p>
        
        {loading ? (
          <div className="flex-center mt-40">Loading sectors...</div>
        ) : (
          <div className="sectors-list">
            {sectors.map((sector) => (
              <div key={sector.id} className="sector-card glass-panel mb-15">
                <div 
                  className="sector-header flex-between" 
                  onClick={() => toggleSector(sector.id)}
                >
                  <div className="flex-center" style={{ gap: '15px' }}>
                    <span className="sector-icon flex-center">{getSectorIcon(sector.id, sector.icon)}</span>
                    <h3>{sector.name}</h3>
                  </div>
                  <div className="sector-toggle">
                    {expandedSector === sector.id ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </div>

                {expandedSector === sector.id && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    className="sector-body mt-15"
                  >
                    {sector.industries.map((industry, iIndex) => (
                      <div key={iIndex} className="industry-group mb-20">
                        <h4 className="industry-title text-gradient mb-10">{industry.name}</h4>
                        <div className="companies-grid">
                          {industry.companies.map((company) => (
                            <div key={company.id} className="company-card">
                              <div className="flex-between mb-5">
                                <span className="company-name">{company.name}</span>
                                <span className="company-ticker text-secondary">{company.id}</span>
                              </div>
                              <div className="flex-between">
                                <span className="company-price">₹{company.price.toFixed(2)}</span>
                                <span className={`company-change ${company.change >= 0 ? 'positive' : 'negative'}`}>
                                  {company.change >= 0 ? '+' : ''}{company.change}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default InvestmentSectors;
