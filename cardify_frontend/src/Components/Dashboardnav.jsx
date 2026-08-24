import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaCreditCard,
  FaChartBar,
  FaUsers,
  FaThLarge,
  FaCog,
  FaUser,
  FaHeadset,
  FaCrown,
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
      <div>
        {/* Brand */}
        <Link to="/" className="dash-sidebar-brand">
          <div className="dash-brand-icon">
            <FaCreditCard />
          </div>
          <h3 className="dash-brand-title">
            CARD<span>IFY</span>
          </h3>
        </Link>

        {/* Sidebar Nav Items */}
        <nav className="dash-sidebar-nav">
          <Link
            to="/dashboard"
            className={`dash-nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
          >
            <FaHome />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/cardlist"
            className={`dash-nav-item ${location.pathname === '/cardlist' ? 'active' : ''}`}
          >
            <FaCreditCard />
            <span>My Cards</span>
          </Link>

          <Link
            to="/dashboard"
            className={`dash-nav-item ${location.pathname === '/analytics' ? 'active' : ''}`}
          >
            <FaChartBar />
            <span>Analytics</span>
          </Link>

          <button
            type="button"
            className={`dash-nav-item ${location.pathname === '/contacts' ? 'active' : ''}`}
            onClick={() => toast.info('Contacts feature connected to your cards')}
          >
            <FaUsers />
            <span>Contacts</span>
          </button>

          <Link
            to="/card-details"
            className={`dash-nav-item ${location.pathname === '/card-details' ? 'active' : ''}`}
          >
            <FaThLarge />
            <span>Templates</span>
          </Link>

          <button
            type="button"
            className={`dash-nav-item ${location.pathname === '/settings' ? 'active' : ''}`}
            onClick={() => toast.info('Settings panel')}
          >
            <FaCog />
            <span>Settings</span>
          </button>

          <button
            type="button"
            className={`dash-nav-item ${location.pathname === '/profile' ? 'active' : ''}`}
            onClick={() => toast.info(`Logged in as: ${username || 'User'}`)}
          >
            <FaUser />
            <span>Profile</span>
          </button>

          <a
            href="https://www.instagram.com/bimalrijal_17/"
            target="_blank"
            rel="noopener noreferrer"
            className="dash-nav-item"
          >
            <FaHeadset />
            <span>Support</span>
          </a>
        </nav>
      </div>

      <div>
        {/* Go Premium Box */}
        <div className="dash-premium-card">
          <div className="dash-premium-icon">
            <FaCrown />
          </div>
          <h5 className="dash-premium-title">Go Premium</h5>
          <p className="dash-premium-desc">
            Unlock premium templates, custom domains and more.
          </p>
          <Link
            to="/card-details"
            className="dash-upgrade-btn"
            state={{ theme: 'gold' }}
          >
            Upgrade Now
          </Link>
        </div>

        {/* Logout Button */}
        <button type="button" className="dash-sidebar-logout" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Dashboardnav;


