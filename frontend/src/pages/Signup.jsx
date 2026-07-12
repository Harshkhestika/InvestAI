import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    password: ''
  });
  const [error, setError] = useState('');
  
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const res = await register(formData);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="auth-container flex-center">
      <div className="auth-box glass-panel">
        <h2 className="text-center text-gradient mb-30">Create Account</h2>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" className="input-field" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" className="input-field" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" name="phone" className="input-field" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Country</label>
            <select name="country" className="input-field" value={formData.country} onChange={handleChange} required>
              <option value="" disabled>Select Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Japan">Japan</option>
              <option value="Germany">Germany</option>
            </select>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" className="input-field" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn-primary w-100 mt-20">Sign Up</button>
        </form>
        <p className="auth-footer text-center mt-20">
          Already have an account? <Link to="/login" className="text-gradient">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
