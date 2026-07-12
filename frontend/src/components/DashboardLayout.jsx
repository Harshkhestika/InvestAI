import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import { AuthContext } from '../context/AuthContext';
import './DashboardLayout.css';

const DashboardLayout = ({ children, title }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <DashboardHeader title={title} />
        <div className="content-area">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
