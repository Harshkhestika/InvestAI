import React, { useContext, useRef, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;
        try {
          const { data } = await API.put('/auth/profile/image', { profileImage: base64Image });
          setUser(data);
          localStorage.setItem('userInfo', JSON.stringify(data));
        } catch (err) {
          console.error("Failed to update profile image", err);
        } finally {
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = async () => {
    setLoading(true);
    try {
      const { data } = await API.put('/auth/profile/image', { profileImage: '' });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
      console.error("Failed to remove profile image", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Dashboard Home">
      <div className="dashboard-grid">
        
        {/* Profile Section */}
        <div className="profile-section glass-panel">
          <h3>User Profile</h3>
          <div className="profile-details mt-20" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="profile-image-container flex-center" style={{ position: 'relative' }}>
              {loading && <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.5)', borderRadius: '50%', zIndex: 10 }} className="flex-center">⏳</div>}
              {user?.profileImage ? (
                <img src={user.profileImage} alt="Profile" className="profile-image" />
              ) : (
                <div className="profile-image-placeholder flex-center">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            
            <div className="profile-image-actions mt-15 flex-center" style={{ gap: '10px' }}>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                style={{ display: 'none' }} 
              />
              <button 
                className="btn-primary" 
                style={{ padding: '6px 12px', fontSize: '0.85rem' }} 
                onClick={() => fileInputRef.current.click()}
                disabled={loading}
              >
                Upload Photo
              </button>
              {user?.profileImage && (
                <button 
                  className="btn-secondary" 
                  style={{ padding: '6px 12px', fontSize: '0.85rem', color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.3)' }} 
                  onClick={handleRemoveImage}
                  disabled={loading}
                >
                  Remove
                </button>
              )}
            </div>
            <div className="profile-info">
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Phone:</strong> {user?.phone}</p>
              <p><strong>Country:</strong> {user?.country}</p>
              <button className="btn-secondary mt-20">Edit Profile</button>
            </div>
          </div>
        </div>

        {/* Current News Section */}
        <div className="current-news-section glass-panel">
          <h3>Market Overview (Mock)</h3>
          <div className="news-list mt-20">
            <div className="news-item">
              <h4>TCS reports Q3 earnings</h4>
              <p className="text-secondary">Technology Sector - India</p>
            </div>
            <div className="news-item">
              <h4>Infosys acquires new startup</h4>
              <p className="text-secondary">Technology Sector - India</p>
            </div>
            <div className="news-item">
              <h4>Wipro announces dividend</h4>
              <p className="text-secondary">Technology Sector - India</p>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
