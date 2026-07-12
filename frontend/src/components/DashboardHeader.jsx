import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaSignOutAlt } from 'react-icons/fa';

const DashboardHeader = ({ title }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-header flex-between glass-panel">
      <h2>{title}</h2>
      <div className="header-actions flex-center">
        <span className="user-name">Welcome, {user?.name}</span>
        <button className="btn-primary flex-center" onClick={() => navigate('/')} style={{ gap: '8px', padding: '8px 16px', marginRight: '10px' }}>
          Home
        </button>
        <button className="btn-secondary flex-center" onClick={handleLogout} style={{ gap: '8px', padding: '8px 16px' }}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
