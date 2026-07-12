import React from 'react';
import Navbar from '../components/Navbar';
import './Home.css'; // Reusing Home styles for the footer

const Legal = () => {
  return (
    <div className="home-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <div className="container section-padding" style={{ flex: 1, maxWidth: '800px' }}>
        <h1 className="text-center mb-40 text-gradient">Legal Information</h1>
        
        <div className="glass-panel p-30 mb-40" style={{ padding: '40px', borderRadius: '16px' }}>
          <h2 className="mb-20">Privacy Policy</h2>
          <p className="text-secondary" style={{ lineHeight: '1.8' }}>
            At InvestAI, we take your privacy seriously. This policy describes what personal information we collect and how we use it.
            <br/><br/>
            <strong>1. Information Collection</strong><br/>
            We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us.
            <br/><br/>
            <strong>2. Use of Information</strong><br/>
            We may use the information we collect about you to provide, maintain, and improve our services, including to facilitate payments, send receipts, provide products and services you request, develop new features, provide customer support, and send updates.
            <br/><br/>
            <strong>3. Security</strong><br/>
            We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
          </p>
        </div>

        <div className="glass-panel p-30" style={{ padding: '40px', borderRadius: '16px' }}>
          <h2 className="mb-20">Terms of Service</h2>
          <p className="text-secondary" style={{ lineHeight: '1.8' }}>
            By using the InvestAI website and services, you agree to these terms and conditions.
            <br/><br/>
            <strong>1. Service Usage</strong><br/>
            InvestAI provides AI-driven financial research and analysis. The information provided by our platform is strictly for educational and research purposes and does not constitute financial advice.
            <br/><br/>
            <strong>2. User Accounts</strong><br/>
            You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
            <br/><br/>
            <strong>3. Disclaimer of Warranties</strong><br/>
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis. InvestAI makes no representations or warranties of any kind, express or implied, as to the operation of their services, or the information, content or materials included therein.
          </p>
        </div>
      </div>

      <footer className="footer glass-panel" style={{ marginTop: 'auto' }}>
        <div className="container flex-between mt-20 pt-20" style={{ fontSize: '0.85rem' }}>
          <span className="text-secondary">© 2026 InvestAI. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default Legal;
