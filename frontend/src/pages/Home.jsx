import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import API from '../services/api';
import './Home.css';

const Home = () => {
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [currentHeroNewsIndex, setCurrentHeroNewsIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      
      if (response.ok) {
        alert("Form submitted successfully! We'll get back to you soon.");
        e.target.reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error", error);
      alert("An error occurred while submitting the form.");
    }
  };

  const handleSubscribeSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      
      if (response.ok) {
        alert("Successfully subscribed to the newsletter!");
        e.target.reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Subscription error", error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (news.length === 0) return;
    const interval = setInterval(() => {
      setCurrentHeroNewsIndex((prev) => (prev + 1) % news.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [news]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await API.get('/news');
        setNews(data);
      } catch (error) {
        console.error('Failed to fetch news', error);
      } finally {
        setLoadingNews(false);
      }
    };
    fetchNews();
  }, []);
  return (
    <div className="home-page">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="hero-section container">
        <div className="hero-grid">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>AI Powered <br/><span className="text-gradient">Investment Research</span></h1>
            <p className="hero-subtitle">Make smarter investment decisions with Artificial Intelligence. Research companies, analyze risks, and get AI recommendations.</p>
            <div className="hero-actions">
              <Link to="/signup" className="btn-primary">Start Analysis</Link>
              <a href="#market" className="btn-secondary">Explore Market</a>
            </div>
          </motion.div>
          <motion.div 
            className="global-news-widget glass-panel"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ padding: '30px' }}
          >
            <div className="widget-header flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '15px', marginBottom: '20px' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', margin: 0 }}>
                <span className="live-dot" style={{ width: '10px', height: '10px', background: 'var(--danger)', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 10px var(--danger)', animation: 'pulse 2s infinite' }}></span>
                Live World Market News
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '500', background: 'var(--bg-tertiary)', padding: '4px 8px', borderRadius: '12px' }}>Top Publishers</span>
            </div>
            
            <div className="widget-news-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px', position: 'relative', height: '300px', overflow: 'hidden' }}>
              {loadingNews ? (
                <div className="flex-center" style={{ height: '100%', color: 'var(--text-secondary)' }}>Loading live updates...</div>
              ) : news.length > 0 ? (
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentHeroNewsIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="widget-news-item"
                    style={{ background: 'var(--bg-primary)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', position: 'absolute', width: '100%' }}
                  >
                    <div style={{ height: '180px', width: '100%', overflow: 'hidden' }}>
                      <img src={news[currentHeroNewsIndex].imageUrl} alt="News" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = '/assets/news1.png' }} />
                    </div>
                    <div style={{ padding: '15px', borderLeft: '4px solid var(--accent-primary)' }}>
                      <div className="flex-between" style={{ marginBottom: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        <span style={{ fontWeight: '700', color: 'var(--accent-hover)' }}>Live Alert</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontSize: '10px' }}>🕒</span> Just now
                        </span>
                      </div>
                      <h4 style={{ fontSize: '1rem', lineHeight: '1.4', margin: 0 }}>
                        <a href={news[currentHeroNewsIndex].link} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                          {news[currentHeroNewsIndex].title.length > 60 ? news[currentHeroNewsIndex].title.substring(0, 57) + '...' : news[currentHeroNewsIndex].title}
                        </a>
                      </h4>
                    </div>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="flex-center" style={{ height: '100%', color: 'var(--text-secondary)' }}>No live updates available.</div>
              )}
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
               <a href="#market" className="text-gradient" style={{ fontWeight: '700', textDecoration: 'none', fontSize: '0.95rem' }}>View All Live News &rarr;</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Market Headlines */}
      <section id="market" className="market-section container section-padding">
        <h2 className="section-title">Today's Market News</h2>
        <div className="market-filter">
          <select className="input-field" style={{ width: '200px' }}>
            <option>USA</option>
            <option>India</option>
            <option>UK</option>
            <option>Japan</option>
            <option>Germany</option>
          </select>
        </div>
        <div className="news-grid grid-3">
          {loadingNews ? (
             <div className="flex-center" style={{ width: '100%', gridColumn: '1 / -1', padding: '40px' }}>
               Loading news from The Times of India...
             </div>
          ) : news.length > 0 ? (
            news.map((item, index) => (
              <motion.div whileHover={{ y: -5 }} key={index} className="news-card glass-panel">
                <div className="news-image">
                  <img src={item.imageUrl} alt={item.title} onError={(e) => { e.target.src = '/assets/news1.png' }} />
                </div>
                <div className="news-content">
                  <h4 title={item.title}>{item.title.length > 55 ? item.title.substring(0, 52) + '...' : item.title}</h4>
                  <p>The Times of India</p>
                  <a href={item.link} target="_blank" rel="noreferrer" className="read-more">Read More</a>
                </div>
              </motion.div>
            ))
          ) : (
             <div className="flex-center" style={{ width: '100%', gridColumn: '1 / -1', padding: '40px' }}>
               Failed to load news.
             </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="features-section container section-padding">
        <h2 className="section-title">Why Choose InvestAI</h2>
        <div className="features-grid grid-3">
          {[
            { title: 'AI Company Analysis', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop', desc: 'Deep dive into company fundamentals using advanced AI algorithms.' },
            { title: 'Real Time Market News', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop', desc: 'Stay updated with the latest financial news affecting your investments.' },
            { title: 'Risk Prediction', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop', desc: 'Evaluate investment risks and mitigate potential losses proactively.' },
            { title: 'Financial Report', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop', desc: 'Generate comprehensive SWOT and financial health reports instantly.' },
            { title: 'Portfolio Tracking', image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=800&auto=format&fit=crop', desc: 'Monitor your assets, allocation, and total returns in one place.' },
            { title: 'AI Investment Assistant', image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop', desc: 'Chat directly with our AI to get personalized insights and answers.' }
          ].map((feature, i) => (
            <motion.div whileHover={{ y: -5 }} key={i} className="news-card glass-panel">
              <div className="news-image">
                <img src={feature.image} alt={feature.title} />
              </div>
              <div className="news-content">
                <h4 style={{ color: 'var(--accent-primary)' }}>{feature.title}</h4>
                <p>{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="how-section container section-padding">
        <h2 className="section-title text-center">How It <span className="text-gradient">Works</span></h2>
        <p className="text-center text-secondary mb-40">Four simple steps to AI-powered investment clarity.</p>
        <div className="steps-horizontal-container">
          {[
            { step: 1, title: 'Enter Company Name', desc: 'Search for any publicly traded company by name or ticker symbol.' },
            { step: 2, title: 'AI Collects Data', desc: 'Our system gathers real-time financial statements, metrics, and historical data.' },
            { step: 3, title: 'AI Analyzes Risks', desc: 'The AI processes thousands of news articles and reports to identify hidden risks.' },
            { step: 4, title: 'Get Recommendation', desc: 'Get a clear, actionable recommendation with detailed reasoning.' }
          ].map((item, index) => (
            <div key={index} className="step-horizontal-item">
              <div className="step-circle-wrapper">
                <div className="step-circle flex-center">{item.step}</div>
                {index < 3 && <div className="step-line"></div>}
              </div>
              <h4 className="mt-20 mb-10 text-center">{item.title}</h4>
              <p className="text-center text-secondary text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="faq-section container section-padding">
        <h2 className="section-title text-center">Frequently Asked <span className="text-gradient">Questions</span></h2>
        <p className="text-center text-secondary mb-40">Everything you need to know about InvestAI.</p>
        <div className="faq-list">
          {[
            { q: 'How does AI analyze companies?', a: 'Our system integrates with premium financial APIs to pull real-time data, earnings reports, and market news. We then pass this contextual data to an advanced Large Language Model (LLM) using LangChain, which evaluates the company\'s health based on predefined financial heuristics and current market sentiment.' },
            { q: 'How accurate are recommendations?', a: 'While our AI models are trained on vast amounts of historical financial data and current market principles, the stock market is inherently unpredictable. Recommendations should be used for research and educational purposes, not as guaranteed financial advice.' },
            { q: 'Where does market data come from?', a: 'We aggregate live data from trusted global financial exchanges and news publishers like Reuters, Bloomberg, and The Times of India.' },
            { q: 'Is this financial advice?', a: 'No, InvestAI is an AI-powered research tool designed to assist you in making your own informed decisions. Always consult with a certified financial advisor before investing.' }
          ].map((faq, index) => (
            <div 
              key={index} 
              className={`faq-accordion-item glass-panel ${openFaqIndex === index ? 'active' : ''}`}
              onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
            >
              <div className="faq-header flex-between">
                <h4 className="m-0" style={{ color: openFaqIndex === index ? 'var(--accent-primary)' : 'inherit' }}>{faq.q}</h4>
                <span className="faq-icon">{openFaqIndex === index ? '∧' : '∨'}</span>
              </div>
              <AnimatePresence>
                {openFaqIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="faq-body"
                  >
                    <p className="text-secondary mt-15 mb-0" style={{ lineHeight: '1.6' }}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="contact-section container section-padding">
        <h2 className="section-title text-center">Get in <span className="text-gradient">Touch</span></h2>
        <p className="text-center text-secondary mb-40">Have a query? Send us a message and we'll get back to you.</p>
        <div className="contact-form-wrapper glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '40px', borderRadius: '16px' }}>
          <form onSubmit={handleContactSubmit} className="contact-form" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input type="hidden" name="access_key" value="ed573845-ba48-4272-8d1b-d05dd221bbc9" />
            
            <div className="input-group">
              <label className="text-secondary" style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Name</label>
              <input type="text" name="name" className="input-field" required />
            </div>
            
            <div className="input-group">
              <label className="text-secondary" style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Email</label>
              <input type="email" name="email" className="input-field" required />
            </div>
            
            <div className="input-group">
              <label className="text-secondary" style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Subject</label>
              <input type="text" name="subject" className="input-field" required />
            </div>
            
            <div className="input-group">
              <label className="text-secondary" style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Query</label>
              <textarea name="query" className="input-field" required style={{ minHeight: '120px', resize: 'vertical' }}></textarea>
            </div>
            
            <button type="submit" className="btn-primary mt-10" style={{ width: '100%', padding: '15px' }}>Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer glass-panel">
        <div className="container footer-grid-4">
          <div className="footer-col">
            <div className="footer-logo text-gradient mb-20" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>InvestAI</div>
            <p className="text-secondary text-sm mb-20">Empowering investors with AI-driven insights and automated financial research.</p>
            <form onSubmit={handleSubscribeSubmit} className="newsletter-box flex-center" style={{ gap: '10px' }}>
              <input type="hidden" name="access_key" value="ed573845-ba48-4272-8d1b-d05dd221bbc9" />
              <input type="hidden" name="subject" value="New Newsletter Subscription" />
              <input type="email" name="email" placeholder="Enter your email" className="input-field" style={{ flex: 1, padding: '10px' }} required />
              <button type="submit" className="btn-primary" style={{ padding: '10px 15px' }}>Subscribe</button>
            </form>
          </div>
          
          <div className="footer-col">
            <h4 className="mb-20">Product</h4>
            <ul className="footer-links-list">
              <li><a href="#features">Features</a></li>
              <li><a href="#market">Company Analysis</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">API</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="mb-20">Resources</h4>
            <ul className="footer-links-list">
              <li><a href="#">Documentation</a></li>
              <li><a href="#market">Market News</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#faq">Support</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="mb-20">Contact</h4>
            <ul className="footer-links-list">
              <li className="flex-center" style={{ justifyContent: 'flex-start', gap: '10px' }}>✉️ hello@investai.test</li>
              <li className="mt-15">123 AI Boulevard</li>
              <li>Tech District, San Francisco</li>
            </ul>
          </div>
        </div>
        
        <div className="container flex-between mt-40 pt-20" style={{ borderTop: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
          <span className="text-secondary">© 2026 InvestAI. All rights reserved.</span>
          <div className="flex-center" style={{ gap: '20px' }}>
            <Link to="/legal" className="text-secondary">Privacy Policy</Link>
            <Link to="/legal" className="text-secondary">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
