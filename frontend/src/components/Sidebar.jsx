import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaChartLine, FaRobot, FaHistory, FaUser, FaLayerGroup, FaList, FaFire } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar glass-panel">
      <div className="sidebar-logo text-gradient">InvestAI</div>
      <div className="sidebar-menu">
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          <FaUser /> Profile
        </NavLink>
        <NavLink to="/analysis" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          <FaChartLine /> AI Analysis
        </NavLink>
        <NavLink to="/portfolio" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          <FaHistory /> Portfolio
        </NavLink>
        <div style={{ margin: '15px 0', borderBottom: '1px solid rgba(0,0,0,0.1)' }}></div>
        <NavLink to="/sectors" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          <FaLayerGroup /> Investment Sectors
        </NavLink>
        <NavLink to="/stocks" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          <FaList /> All Stocks
        </NavLink>
        <NavLink to="/trends" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          <FaFire /> Market Trends
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
