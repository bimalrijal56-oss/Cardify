import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from "react-qr-code";
import { BsLinkedin, BsTwitterX, BsInstagram, BsTelephoneFill, BsEnvelopeFill, BsGlobe } from "react-icons/bs";
import { API_BASE_URL } from '../config';

const resolveImageSrc = (image) => {
  if (!image) return '';
  if (typeof image === 'string' && image.startsWith('http')) return image;
  if (typeof image === 'string') return `${API_BASE_URL}${image.startsWith('/') ? '' : '/'}${image}`;
  return '';
};

const Card = () => {
  const { uuid } = useParams();
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const cardlink = `${window.location.origin}/card/${uuid}`;

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/api/cards/?format=json`)
      .then(res => {
        const allCards = Array.isArray(res.data) ? res.data : [];
        const found = allCards.find(c => c.uuid === uuid);
        if (found) {
          setCardData(found);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [uuid]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (!cardData) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light p-4 text-center">
        <h3 className="fw-bold text-dark mb-2">Card Not Found</h3>
        <p className="text-muted">This card may have been removed or the link is invalid.</p>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 py-5 bg-light px-3">
      <div className="w-100" style={{ maxWidth: '420px' }}>
        <div className={`sample-preview-card p-4 border rounded-4 shadow ${cardData.theme || 'blue'}`}>
          <hr className="card-stripe" />
          <div className="align-items-center card-logo shadow p-2 mb-3">
            {cardData.image ? (
              <div className="profile-image">
                <img
                  src={resolveImageSrc(cardData.image)}
                  alt={cardData.name}
                  crossOrigin="anonymous"
                />
              </div>
            ) : (
              <span className="fw-bold fs-5 text-dark p-2 card-text-wrap">
                {cardData.name ? cardData.name.charAt(0).toUpperCase() : 'C'}
              </span>
            )}
          </div>
          <h4 className="fw-bold text-white mb-0">{cardData.name}</h4>
          {cardData.job && <span className="text-info">{cardData.job}</span>}
          {cardData.job && <br />}
          {cardData.company && <span className="text-white-50 small">{cardData.company}</span>}
          <hr />
          {cardData.tel && (
            <div className="contact-row mb-1">
              <BsTelephoneFill className="text-info me-2" />
              <span className="text-white-50 small">{cardData.tel}</span>
            </div>
          )}
          {cardData.email && (
            <div className="contact-row mb-1">
              <BsEnvelopeFill className="text-info me-2" />
              <span className="text-white-50 small">{cardData.email}</span>
            </div>
          )}
          {cardData.address && (
            <div className="contact-row mb-1">
              <BsGlobe className="text-info me-2" />
              <span className="text-white-50 small">{cardData.address}</span>
            </div>
          )}
          <hr />
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div className="bg-white p-1 rounded-2 shadow-sm">
              <QRCode value={cardlink} size={256} style={{ height: "45px", maxWidth: "45px", width: "45px" }} />
            </div>
            <div className="d-flex card-social-icons gap-2">
              {(cardData.linkedin_link || cardData.linkedin) && (
                <a href={cardData.linkedin_link || cardData.linkedin} target="_blank" rel="noreferrer" className="card-icons">
                  <div className="icon-box"><BsLinkedin /></div>
                </a>
              )}
              {(cardData.twitter_link || cardData.twitter) && (
                <a href={cardData.twitter_link || cardData.twitter} target="_blank" rel="noreferrer" className="card-icons">
                  <div className="icon-box"><BsTwitterX /></div>
                </a>
              )}
              {(cardData.insta_link || cardData.instagram) && (
                <a href={cardData.insta_link || cardData.instagram} target="_blank" rel="noreferrer" className="card-icons">
                  <div className="icon-box"><BsInstagram /></div>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

