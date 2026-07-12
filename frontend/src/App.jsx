import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// We will create these pages next
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Analysis from './pages/Analysis';
import Portfolio from './pages/Portfolio';
import ChatAssistant from './pages/ChatAssistant';
import InvestmentSectors from './pages/InvestmentSectors';
import AllStocks from './pages/AllStocks';
import MarketTrends from './pages/MarketTrends';
import Legal from './pages/Legal';
import DisclaimerModal from './components/DisclaimerModal';

function App() {
  return (
    <AuthProvider>
      <DisclaimerModal />
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/chat" element={<ChatAssistant />} />
            <Route path="/sectors" element={<InvestmentSectors />} />
            <Route path="/stocks" element={<AllStocks />} />
            <Route path="/trends" element={<MarketTrends />} />
            <Route path="/legal" element={<Legal />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
