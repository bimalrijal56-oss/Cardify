import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaCreditCard,
  FaChartBar,
  FaThLarge,
  FaHeadset,
  FaSignOutAlt,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const Dashboardnav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user) {
      setUsername(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
    toast.success('Logged out successfully', { className: 'toast-success-glow' });
    navigate('/login');
  };

  return (
    <aside className="dash-sidebar">
      <div className="dash-sidebar-top">
        {/* Brand with logo matching home navbar */}
        <Link to="/" className="dash-sidebar-brand">
          <img src="/CARDIFY1.png" alt="CARDIFY Logo" className="dash-sidebar-logo-img" />
          <div className="dash-sidebar-brand-text">
            <span className="dash-brand-text-white">CARD</span>
            <span className="dash-brand-text-blue">IFY</span>
          </div>
        </Link>

        {/* Sidebar Nav Items */}
        <nav className="dash-sidebar-nav">
          <Link
            to="/dashboard"
            className={`dash-nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
          >
            <FaHome className="dash-nav-icon" />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/cardlist"
            className={`dash-nav-item ${location.pathname === '/cardlist' ? 'active' : ''}`}
          >
            <FaCreditCard className="dash-nav-icon" />
            <span>My Cards</span>
          </Link>

          <Link
            to="/dashboard"
            className={`dash-nav-item ${location.pathname === '/analytics' ? 'active' : ''}`}
          >
            <FaChartBar className="dash-nav-icon" />
            <span>Analytics</span>
          </Link>

          <Link
            to="/card-details"
            className={`dash-nav-item ${location.pathname === '/card-details' ? 'active' : ''}`}
          >
            <FaThLarge className="dash-nav-icon" />
            <span>Templates</span>
          </Link>

          <a
            href="https://www.instagram.com/bimalrijal_17/"
            target="_blank"
            rel="noopener noreferrer"
            className="dash-nav-item"
          >
            <FaHeadset className="dash-nav-icon" />
            <span>Support</span>
          </a>
        </nav>
      </div>

      <div className="dash-sidebar-bottom">
        {/* User Mini Profile */}
        <div className="dash-sidebar-user">
          <div className="dash-sidebar-avatar">
            {username ? username.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="dash-sidebar-user-info">
            <div className="dash-sidebar-username">{username || 'User'}</div>
            <div className="dash-sidebar-status">
              <span className="dash-status-dot"></span>
              Active
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button type="button" className="dash-sidebar-logout" onClick={handleLogout}>
          <FaSignOutAlt className="dash-logout-icon" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Dashboardnav;
