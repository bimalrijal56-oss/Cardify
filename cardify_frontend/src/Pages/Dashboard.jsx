import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Counter from '../Components/Counter';
import ClicksChart from '../Components/ClicksChart';
import { API_BASE_URL } from '../config';
import {
  BsEyeFill,
  BsCursorFill,
  BsQrCode,
  BsCreditCard2FrontFill,
  BsChevronDown,
  BsPlusLg,
  BsShare,
  BsTrash,
  BsEye,
  BsBarChartFill,
  BsPlusCircleDotted,
} from 'react-icons/bs';
import { FaBell } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  const user_id = Number(localStorage.getItem('user_id'));
  const storedUsername = localStorage.getItem('username');
  const displayName = storedUsername || 'User';

  const [cards, setCards] = useState([]);
  const [totalClicks, setTotalClicks] = useState(0);
  const [timeFilter, setTimeFilter] = useState('All Time');
  const [loading, setLoading] = useState(true);

  // Fetch real user cards
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/api/cards/?format=json`)
      .then((res) => {
        setCards(res.data || []);
      })
      .catch((err) => {
        console.error('Error fetching cards:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Fetch real user dashboard stats
  useEffect(() => {
    if (user_id) {
      axios
        .get(`${API_BASE_URL}/api/dashboard-stats/?user_id=${user_id}`)
        .then((res) => {
          if (res.data && res.data.total_clicks !== undefined) {
            setTotalClicks(res.data.total_clicks);
          }
        })
        .catch((error) => console.error('Error fetching stats:', error));
    }
  }, [user_id]);

  // Filter cards strictly for current user
  const userCards = cards.filter((item) => Number(item.user) === user_id || item.user?.id === user_id);
  const cardsCount = userCards.length;

  // Compute real views from user's cards
  const realTotalViews = userCards.reduce((acc, card) => acc + (Number(card.views) || 0), 0);
  const effectiveClicks = totalClicks > 0 ? totalClicks : realTotalViews;
  const qrScansCount = realTotalViews; // In Cardify, views increment when card QR/link is accessed

  // Sort recent cards by latest created date / ID
  const recentUserCards = [...userCards].sort((a, b) => {
    const dateA = a.created_at ? new Date(a.created_at).getTime() : a.id || 0;
    const dateB = b.created_at ? new Date(b.created_at).getTime() : b.id || 0;
    return dateB - dateA;
  });

  // Top performing card by real views
  const topCard =
    userCards.length > 0
      ? [...userCards].sort((a, b) => (Number(b.views) || 0) - (Number(a.views) || 0))[0]
      : null;

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
    toast.success('Logged out successfully', { className: 'toast-success-glow' });
    navigate('/login');
  };

  const handleShare = (uuid) => {
    const shareUrl = `${window.location.origin}/card/${uuid}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      toast.success('Card link copied to clipboard!', { className: 'toast-success-glow' });
    } else {
      toast.info(`Card link: ${shareUrl}`);
    }
  };

  const handleDelete = (uuid) => {
    let toastId = toast.warning(
      <div>
        <p className="mb-2 text-dark">Are you sure you want to delete this card?</p>
        <button
          className="btn btn-danger btn-sm me-2"
          onClick={() => deleteCard(uuid, toastId)}
        >
          Delete
        </button>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => toast.dismiss(toastId)}
        >
          Cancel
        </button>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        className: 'toast-warning-glow',
      }
    );
  };

  const deleteCard = async (uuid, toastId) => {
    toast.dismiss(toastId);
    try {
      await axios.delete(`${API_BASE_URL}/api/cards/${uuid}/`);
      setCards((prevCards) => prevCards.filter((card) => card.uuid !== uuid));
      toast.success('Card deleted successfully', { className: 'toast-success-glow' });
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete card', { className: 'toast-error-glow' });
    }
  };

  return (
    <>
      {/* Topbar */}
      <header className="dash-topbar">
        <div>
          <h1 className="dash-welcome-title">Welcome back, {displayName}!</h1>
          <p className="dash-welcome-sub">
            Here's what's happening with your cards today.
          </p>
        </div>

          <div className="dash-topbar-actions">
            {/* Notification Bell */}
            <div
              className="dash-notif-btn"
              title="Notifications"
              onClick={() => toast.info('No new notifications')}
            >
              <FaBell size={15} />
              <span className="dash-notif-dot"></span>
            </div>

            {/* User Profile Pill */}
            <div className="dash-user-pill">
              {userCards[0]?.image ? (
                <img
                  src={userCards[0].image}
                  alt={displayName}
                  className="dash-user-avatar"
                />
              ) : (
                <div
                  className="dash-user-avatar d-flex align-items-center justify-content-center bg-primary text-white fw-bold"
                  style={{ fontSize: '0.85rem' }}
                >
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="dash-user-name">{displayName}</span>
              <BsChevronDown size={12} color="#64748b" />
            </div>

            {/* Create New Card Button */}
            <Link to="/card-details" className="dash-btn-create">
              <BsPlusLg size={13} />
              <span>Create New Card</span>
            </Link>
          </div>
        </header>

        {/* ── 4 STATS METRIC CARDS ROW ── */}
        <section className="dash-metrics-grid">
          {/* Card 1: Total Views */}
          <div className="dash-metric-card views-card">
            <div className="dash-metric-icon-box">
              <BsEyeFill />
            </div>
            <div className="dash-metric-content">
              <span className="dash-metric-label">Total Views</span>
              <h3 className="dash-metric-value">
                <Counter end={realTotalViews} />
              </h3>
              <span className="dash-metric-trend">Real-time views</span>
            </div>
          </div>

          {/* Card 2: Total Clicks */}
          <div className="dash-metric-card clicks-card">
            <div className="dash-metric-icon-box">
              <BsCursorFill />
            </div>
            <div className="dash-metric-content">
              <span className="dash-metric-label">Total Clicks</span>
              <h3 className="dash-metric-value">
                <Counter end={effectiveClicks} />
              </h3>
              <span className="dash-metric-trend">Total interactions</span>
            </div>
          </div>

          {/* Card 3: QR Scans */}
          <div className="dash-metric-card scans-card">
            <div className="dash-metric-icon-box">
              <BsQrCode />
            </div>
            <div className="dash-metric-content">
              <span className="dash-metric-label">QR Scans</span>
              <h3 className="dash-metric-value">
                <Counter end={qrScansCount} />
              </h3>
              <span className="dash-metric-trend">Scan views</span>
            </div>
          </div>

          {/* Card 4: Total Cards */}
          <div className="dash-metric-card total-card">
            <div className="dash-metric-icon-box">
              <BsCreditCard2FrontFill />
            </div>
            <div className="dash-metric-content">
              <span className="dash-metric-label">Total Cards</span>
              <h3 className="dash-metric-value">
                <Counter end={cardsCount} />
              </h3>
              <span className="dash-metric-subtext">Active cards</span>
            </div>
          </div>
        </section>

        {/* ── 2-COLUMN MAIN SECTION ── */}
        <div className="dash-columns-grid">
          {/* Left Column: Recent Cards */}
          <section className="dash-recent-col">
            <div className="dash-section-header">
              <h3 className="dash-section-title">Recent Cards</h3>
              {cardsCount > 0 && (
                <Link to="/cardlist" className="dash-view-all-link">
                  View All ({cardsCount})
                </Link>
              )}
            </div>

            <div className="dash-recent-list">
              {loading ? (
                <div className="p-4 text-center text-muted bg-white rounded-3 border">
                  Loading your cards...
                </div>
              ) : recentUserCards.length > 0 ? (
                recentUserCards.slice(0, 4).map((item) => (
                  <div key={item.uuid || item.id} className="recent-card-row">
                    {/* Thumbnail */}
                    <div className="recent-card-thumb">
                      {item.image ? (
                        <img src={item.image} alt={item.name || 'Card'} />
                      ) : (
                        <div className={`recent-card-thumb-mini ${item.theme || 'blue'}`}>
                          <BsCreditCard2FrontFill size={20} />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="recent-card-info">
                      <div className="recent-card-header-line">
                        <h4 className="recent-card-name">{item.name || 'Untitled Card'}</h4>
                        <span className="badge-active">Active</span>
                      </div>
                      <p className="recent-card-subtitle">
                        {item.job || 'No Job Title Specified'}
                        {item.company ? ` at ${item.company}` : ''}
                      </p>
                      <span className="recent-card-time">
                        {item.created_at
                          ? `Created ${new Date(item.created_at).toLocaleDateString()}`
                          : 'Recently created'}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="recent-card-actions">
                      <Link
                        to={`/card-preview/${item.uuid}`}
                        state={{ cardData: item, image: item.image }}
                        className="recent-action-btn"
                        title="View Card"
                      >
                        <BsEye size={15} />
                      </Link>

                      <button
                        className="recent-action-btn"
                        title="Share Card"
                        onClick={() => handleShare(item.uuid)}
                      >
                        <FaShareAlt size={13} />
                      </button>

                      <button
                        className="recent-action-btn btn-delete"
                        title="Delete Card"
                        onClick={() => handleDelete(item.uuid)}
                      >
                        <BsTrash size={14} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  className="bg-white border rounded-4 p-4 text-center"
                  style={{ borderColor: '#e2e8f0' }}
                >
                  <div className="mb-3 text-primary">
                    <BsPlusCircleDotted size={40} />
                  </div>
                  <h5 className="fw-bold text-dark mb-1">No cards created yet</h5>
                  <p className="text-muted small mb-3">
                    Start by creating your first personalized digital visiting card.
                  </p>
                  <Link to="/card-details" className="dash-btn-create d-inline-flex">
                    <BsPlusLg size={13} />
                    <span>Create Your First Card</span>
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* Right Column: Widgets */}
          <div className="dash-widgets-col">
            {/* Widget 1: Analytics Overview */}
            <div className="dash-widget-box" id="analytics-overview-box">
              <div className="dash-widget-header">
                <h4 className="dash-widget-title">Analytics Overview</h4>
                <div
                  className="dash-filter-pill"
                  onClick={() =>
                    setTimeFilter((prev) => (prev === 'All Time' ? 'This Week' : 'All Time'))
                  }
                >
                  <span>{timeFilter}</span>
                  <BsChevronDown size={10} />
                </div>
              </div>

              <ClicksChart cards={userCards} />
            </div>

            {/* Widget 2: Top Performing Card */}
            <div className="dash-widget-box">
              <div className="dash-widget-header">
                <h4 className="dash-widget-title">Top Performing Card</h4>
              </div>

              {topCard ? (
                <>
                  <div className="top-card-content">
                    <div className={`top-card-preview-mini ${topCard.theme || 'blue'}`}>
                      {topCard.image ? (
                        <img src={topCard.image} alt={topCard.name} />
                      ) : (
                        <BsCreditCard2FrontFill size={28} />
                      )}
                    </div>

                    <div className="top-card-meta">
                      <h4 className="top-card-name">{topCard.name || displayName}</h4>
                      <p className="top-card-role">
                        {topCard.job || 'Digital Card'}
                        {topCard.company ? ` • ${topCard.company}` : ''}
                      </p>

                      <div className="top-card-stats">
                        <div className="top-stat-item">
                          <span className="top-stat-label">Views</span>
                          <span className="top-stat-val">
                            <Counter end={Number(topCard.views) || 0} />
                          </span>
                        </div>
                        <div className="top-stat-item">
                          <span className="top-stat-label">Theme</span>
                          <span className="top-stat-val text-capitalize" style={{ fontSize: '0.9rem' }}>
                            {topCard.theme || 'Default'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/card-preview/${topCard.uuid}`}
                    state={{ cardData: topCard, image: topCard.image }}
                    className="btn-view-analytics"
                  >
                    <BsEye size={14} />
                    <span>View Top Card</span>
                  </Link>
                </>
              ) : (
                <div className="py-3 text-center text-muted" style={{ fontSize: '0.85rem' }}>
                  <p className="mb-2">No cards available yet.</p>
                  <Link to="/card-details" className="btn btn-sm btn-outline-primary">
                    Create a Card
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
    </>
  );
};

export default Dashboard;



