import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import QRCode from "react-qr-code";
import { API_BASE_URL } from '../config';
import {
  FaUser,
  FaBriefcase,
  FaPhone,
  FaShareAlt,
  FaCloudUploadAlt,
  FaPalette,
  FaCheck,
  FaPlus,
} from 'react-icons/fa';

const themesList = [
  { id: 'blue', name: 'Ocean Blue', color: '#2563eb' },
  { id: 'dark', name: 'Midnight Dark', color: '#0f172a' },
  { id: 'gold', name: 'Royal Gold', color: '#f59e0b' },
  { id: 'purple', name: 'Vibrant Purple', color: '#7c3aed' },
  { id: 'green', name: 'Emerald Green', color: '#059669' },
  { id: 'crimson', name: 'Ruby Crimson', color: '#dc2626' },
];

const CardDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialTheme = location.state?.theme || 'blue';

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [cardData, setCardData] = useState({
    name: '',
    job: '',
    company: '',
    address: '',
    tel: '',
    email: '',
    website: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    theme: initialTheme,
  });

  // Check login authentication on load
  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      toast.info('Please log in before creating a business card.', { className: 'toast-warning-glow' });
      navigate('/login');
    }
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value,
    });
  };

  const handleThemeChange = (selectedTheme) => {
    setCardData((prev) => ({
      ...prev,
      theme: selectedTheme,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    const userId = localStorage.getItem('user_id');
    if (!userId) {
      toast.warning('Please log in first to create your card.', { className: 'toast-warning-glow' });
      navigate('/login');
      return;
    }

    if (!cardData.name.trim()) {
      toast.warning('Please enter your full name.', { className: 'toast-warning-glow' });
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    if (image) {
      formData.append('image', image);
    }
    formData.append('name', cardData.name);
    formData.append('title', cardData.name || 'Business Card');
    formData.append('job', cardData.job);
    formData.append('company', cardData.company);
    formData.append('address', cardData.address);
    formData.append('tel', cardData.tel);
    formData.append('email', cardData.email);
    formData.append('web_url', cardData.website);
    formData.append('fb_link', cardData.facebook);
    formData.append('twitter_link', cardData.twitter);
    formData.append('linkedin_link', cardData.linkedin);
    formData.append('insta_link', cardData.instagram);
    formData.append('theme', cardData.theme);
    formData.append('user', userId);

    try {
      const response = await toast.promise(
        axios.post(`${API_BASE_URL}/api/cards/`, formData),
        {
          pending: 'Creating your card...',
          success: 'Card created successfully!',
          error: 'An error occurred while creating the card.',
        }
      );
      navigate(`/card-preview/${response.data.uuid}`, {
        state: { cardData: response.data, image: response.data.image || imagePreview },
      });
    } catch (error) {
      const errorData = error.response?.data;
      const rawErrorStr = JSON.stringify(errorData || error.message || '');

      if (rawErrorStr.includes('Invalid pk') || rawErrorStr.includes('does not exist')) {
        // User session in localStorage is stale or points to a non-existent DB record
        localStorage.removeItem('user_id');
        localStorage.removeItem('username');
        toast.error('Your login session is invalid. Please log in again.', { className: 'toast-error-glow' });
        navigate('/login');
        return;
      }

      const errorMessage =
        typeof errorData === 'string'
          ? errorData
          : errorData && typeof errorData === 'object'
          ? Object.values(errorData).flat().filter(Boolean).join(' ') ||
            'An error occurred while creating the card.'
          : 'An error occurred while creating the card.';

      toast.error(errorMessage, { className: 'toast-error-glow' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-white-theme">
      {/* ── CLEAN TOPBAR HEADER ── */}
      <div className="dash-topbar mb-4">
        <div>
          <h1 className="dash-welcome-title">Customize Your Business Card</h1>
          <p className="dash-welcome-sub">
            Fill in your professional details below to generate your personalized digital card with real-time preview.
          </p>
        </div>
      </div>

      {/* ── 2-COLUMN BUILDER + LIVE PREVIEW ── */}
      <div className="row g-4 align-items-start">
        {/* Left Column: Form */}
        <div className="col-12 col-xl-7">
          <div className="builder-form-card">
            <form onSubmit={handleSubmit}>
              {/* Theme Picker */}
              <div className="mb-4">
                <div className="builder-section-title">
                  <FaPalette className="text-primary" />
                  <span>Choose Card Theme</span>
                </div>
                <div className="theme-pill-selector">
                  {themesList.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      className={`theme-pill-btn d-flex align-items-center gap-2 ${
                        cardData.theme === t.id ? 'active' : ''
                      }`}
                      onClick={() => handleThemeChange(t.id)}
                    >
                      <span
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: t.color,
                          display: 'inline-block',
                        }}
                      ></span>
                      <span>{t.name}</span>
                      {cardData.theme === t.id && <FaCheck size={10} />}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="my-4" style={{ borderColor: '#e2e8f0' }} />

              {/* Photo Upload */}
              <div className="mb-4">
                <div className="builder-section-title">
                  <FaCloudUploadAlt className="text-primary" />
                  <span>Profile Photo</span>
                </div>
                <div className="builder-upload-dropzone">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    {imagePreview ? (
                      <div className="mb-2">
                        <img
                          src={imagePreview}
                          alt="Uploaded avatar"
                          style={{
                            width: 64,
                            height: 64,
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '3px solid #2563eb',
                          }}
                        />
                      </div>
                    ) : (
                      <FaCloudUploadAlt size={36} className="text-primary mb-2" />
                    )}
                    <p className="fw-semibold text-dark mb-1" style={{ fontSize: '0.9rem' }}>
                      {image ? image.name : 'Click or drop your photo here'}
                    </p>
                    <span className="text-muted small">
                      PNG, JPG up to 5MB · Recommended 400×400px
                    </span>
                  </div>
                </div>
              </div>

              <hr className="my-4" style={{ borderColor: '#e2e8f0' }} />

              {/* Basic Information */}
              <div className="mb-4">
                <div className="builder-section-title">
                  <FaUser className="text-primary" />
                  <span>Basic Information</span>
                </div>
                <div className="row g-3">
                  <div className="col-12 col-md-6 builder-input-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="e.g. Alex Morgan"
                      className="builder-input"
                      value={cardData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6 builder-input-group">
                    <label htmlFor="job">Job Title / Role</label>
                    <input
                      type="text"
                      id="job"
                      name="job"
                      placeholder="e.g. Product Designer"
                      className="builder-input"
                      value={cardData.job}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-md-6 builder-input-group">
                    <label htmlFor="company">Company / Organization</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      placeholder="e.g. Cardify Tech Inc."
                      className="builder-input"
                      value={cardData.company}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-md-6 builder-input-group">
                    <label htmlFor="address">Location / Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      placeholder="e.g. San Francisco, CA"
                      className="builder-input"
                      value={cardData.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <hr className="my-4" style={{ borderColor: '#e2e8f0' }} />

              {/* Contact Information */}
              <div className="mb-4">
                <div className="builder-section-title">
                  <FaPhone className="text-primary" />
                  <span>Contact Information</span>
                </div>
                <div className="row g-3">
                  <div className="col-12 col-md-6 builder-input-group">
                    <label htmlFor="tel">Phone Number</label>
                    <input
                      type="text"
                      id="tel"
                      name="tel"
                      placeholder="e.g. +1 (555) 019-2834"
                      className="builder-input"
                      value={cardData.tel}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-md-6 builder-input-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="e.g. alex@cardify.io"
                      className="builder-input"
                      value={cardData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 builder-input-group">
                    <label htmlFor="website">Website URL</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      placeholder="e.g. https://alexmorgan.design"
                      className="builder-input"
                      value={cardData.website}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <hr className="my-4" style={{ borderColor: '#e2e8f0' }} />

              {/* Social Media Links */}
              <div className="mb-4">
                <div className="builder-section-title">
                  <FaShareAlt className="text-primary" />
                  <span>Social Profiles</span>
                </div>
                <div className="row g-3">
                  <div className="col-12 col-md-6 builder-input-group">
                    <label htmlFor="linkedin">LinkedIn URL</label>
                    <input
                      type="text"
                      id="linkedin"
                      name="linkedin"
                      placeholder="https://linkedin.com/in/username"
                      className="builder-input"
                      value={cardData.linkedin}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-md-6 builder-input-group">
                    <label htmlFor="twitter">Twitter / X URL</label>
                    <input
                      type="text"
                      id="twitter"
                      name="twitter"
                      placeholder="https://x.com/username"
                      className="builder-input"
                      value={cardData.twitter}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-md-6 builder-input-group">
                    <label htmlFor="facebook">Facebook URL</label>
                    <input
                      type="text"
                      id="facebook"
                      name="facebook"
                      placeholder="https://facebook.com/username"
                      className="builder-input"
                      value={cardData.facebook}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-md-6 builder-input-group">
                    <label htmlFor="instagram">Instagram URL</label>
                    <input
                      type="text"
                      id="instagram"
                      name="instagram"
                      placeholder="https://instagram.com/username"
                      className="builder-input"
                      value={cardData.instagram}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="dash-btn-create w-100 py-3 d-flex justify-content-center align-items-center gap-2"
                style={{ fontSize: '1rem', borderRadius: 12 }}
                disabled={isSubmitting}
              >
                <FaPlus size={14} />
                <span>{isSubmitting ? 'Creating Your Card...' : 'Create & Preview Card'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Sticky Live Preview */}
        <div className="col-12 col-xl-5">
          <div className="sticky-preview-box">
            <div className="builder-form-card">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="fw-bold text-dark mb-0">Live Card Preview</h5>
                <span className="badge bg-success-subtle text-success px-2 py-1 rounded-pill small">
                  Live Preview
                </span>
              </div>
              <p className="text-muted small mb-4">
                This is how your digital card appears to visitors when scanned or viewed online.
              </p>

              {/* Render Preview Card */}
              <div className={`sample-detail-card p-4 border rounded-4 shadow-sm ${cardData.theme || 'blue'}`}>
                <hr className="card-stripe" />
                <div className="align-items-center card-logo shadow p-2 mb-3">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview Avatar"
                      style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  ) : (
                    <span className="fw-bold fs-5 text-dark p-2">
                      {cardData.name ? cardData.name.charAt(0).toUpperCase() : 'C'}
                    </span>
                  )}
                </div>

                <h4 className="fw-bold text-white mb-0">
                  {cardData.name || localStorage.getItem('username') || 'Your Name'}
                </h4>
                {cardData.job && (
                  <>
                    <span className="text-info fw-semibold">{cardData.job}</span>
                    <br />
                  </>
                )}
                {cardData.company && (
                  <span className="text-white-50 small">{cardData.company}</span>
                )}

                {(cardData.tel || cardData.email || cardData.address) && <hr />}

                {cardData.tel && (
                  <div className="contact-row mb-1">
                    <i className="bi bi-telephone-fill text-info me-2"></i>
                    <span className="text-white-50 small">{cardData.tel}</span>
                  </div>
                )}
                {cardData.email && (
                  <div className="contact-row mb-1">
                    <i className="bi bi-envelope-fill text-info me-2"></i>
                    <span className="text-white-50 small">{cardData.email}</span>
                  </div>
                )}
                {cardData.address && (
                  <div className="contact-row mb-1">
                    <i className="bi bi-globe text-info me-2"></i>
                    <span className="text-white-50 small">{cardData.address}</span>
                  </div>
                )}

                <hr />

                <div className="d-flex justify-content-between align-items-center">
                  <div className="bg-white p-1 rounded-2 shadow-sm">
                    <QRCode
                      value={window.location.origin}
                      size={44}
                      style={{ height: '44px', maxWidth: '44px', width: '44px' }}
                    />
                  </div>
                  <div className="d-flex gap-2">
                    <span className="card-icons" title="LinkedIn">
                      <i className="bi bi-linkedin text-info fs-6"></i>
                    </span>
                    <span className="card-icons" title="Twitter / X">
                      <i className="bi bi-twitter text-info fs-6"></i>
                    </span>
                    <span className="card-icons" title="Instagram">
                      <i className="bi bi-instagram text-info fs-6"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;


