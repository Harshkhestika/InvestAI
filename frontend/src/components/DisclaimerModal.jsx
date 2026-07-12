import React, { useState, useEffect } from 'react';
import './DisclaimerModal.css';

const DisclaimerModal = () => {
  const [show, setShow] = useState(false);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const hasAgreed = localStorage.getItem('investai_disclaimer_agreed');
    if (!hasAgreed) {
      setShow(true);
    }
  }, []);

  const handleConfirm = () => {
    if (agreed) {
      localStorage.setItem('investai_disclaimer_agreed', 'true');
      setShow(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay flex-center">
      <div className="modal-content glass-panel">
        <h3 className="text-gradient mb-20" style={{ fontSize: '1.5rem' }}>Important Disclaimer</h3>
        <p className="mb-20" style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          InvestAI can give information related to investing money in the share market, but it is <strong>not 100% correct</strong>. 
          InvestAI only provides information and AI-based analysis about share market companies. 
          <br /><br />
          <strong>The final investment decision is yours.</strong> Please carefully collect data, do your own research, and consult a financial advisor before investing money in the market.
        </p>
        
        <div className="agreement-section flex-center mb-20" style={{ justifyContent: 'flex-start', gap: '10px' }}>
          <input 
            type="radio" 
            id="agreeRadio" 
            checked={agreed} 
            onChange={() => setAgreed(!agreed)} 
            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
          />
          <label htmlFor="agreeRadio" style={{ cursor: 'pointer', fontWeight: '500' }}>
            I agree and understand the risks
          </label>
        </div>

        <button 
          className="btn-primary w-100" 
          onClick={handleConfirm} 
          disabled={!agreed}
          style={{ opacity: agreed ? 1 : 0.5, cursor: agreed ? 'pointer' : 'not-allowed' }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default DisclaimerModal;
