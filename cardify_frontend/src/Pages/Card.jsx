import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from "react-qr-code";
import { BsLinkedin, BsTwitterX, BsFacebook, BsInstagram, BsTelephoneFill, BsEnvelopeFill, BsGlobe } from "react-icons/bs";
import { API_BASE_URL } from '../config';

const resolveImageSrc = (image) => {
  if (!image) return '';
  if (typeof image === 'string' && (image.startsWith('data:') || image.startsWith('blob:'))) return image;
  if (typeof image === 'string' && image.startsWith('http')) {
    if (window.location.protocol === 'https:' && image.startsWith('http://')) {
      return image.replace('http://', 'https://');
    }
    return image;
  }
  if (typeof image === 'string') {
    if (image.startsWith('/media/') || image.startsWith('media/')) {
      const cleanPath = image.startsWith('/') ? image : `/${image}`;
      return `${API_BASE_URL}${cleanPath}`;
    }
    if (image.startsWith('/Cards/') || image.startsWith('Cards/')) {
      const cleanPath = image.startsWith('/') ? image : `/${image}`;
      return `${API_BASE_URL}/media${cleanPath}`;
    }
    return `${API_BASE_URL}${image.startsWith('/') ? '' : '/'}${image}`;
  }
  return '';
};

const Card = () => {
  const { uuid } = useParams();
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const cardlink = `${window.location.origin}/card/${uuid}`;

  useEffect(() => {
    if (!uuid) return;
    setLoading(true);
    axios.get(`${API_BASE_URL}/api/cards/${uuid}/`)
      .then(res => {
        if (res.data) {
          setCardData(res.data);
        }
      })
      .catch(err => {
        console.error('Error fetching card by uuid:', err);
        axios.get(`${API_BASE_URL}/api/cards/?format=json`)
          .then(listRes => {
            const allCards = Array.isArray(listRes.data) ? listRes.data : [];
            const found = allCards.find(c => c.uuid === uuid);
            if (found) setCardData(found);
          })
          .catch(e => console.error(e));
      })
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
          <div className="card-avatar-wrapper">
            {cardData.image ? (
              <img
                src={resolveImageSrc(cardData.image)}
                alt={cardData.name}
                crossOrigin="anonymous"
              />
            ) : (
              <span className="card-avatar-initial">
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
            <div className="contact-row">
              <BsTelephoneFill className="text-info" />
              <span className="text-white-50 small">{cardData.tel}</span>
            </div>
          )}
          {cardData.email && (
            <div className="contact-row">
              <BsEnvelopeFill className="text-info" />
              <span className="text-white-50 small">{cardData.email}</span>
            </div>
          )}
          {cardData?.address && (
            <div className="contact-row">
              <BsGlobe className="text-info" />
              <span className="text-white-50 small">{cardData.address}</span>
            </div>
          )}
          <hr className="my-3" />
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 pt-1">
            <div className="bg-white p-1 rounded-2 shadow-sm">
              <QRCode value={cardlink} size={256} style={{ height: "45px", maxWidth: "45px", width: "45px" }} />
            </div>
            <div className="d-flex card-social-icons gap-2">
              <a href={cardData?.linkedin_link || cardData?.linkedin || "#"} target={cardData?.linkedin_link || cardData?.linkedin ? "_blank" : undefined} rel="noreferrer" className="card-icons" title="LinkedIn">
                <div className="icon-box"><BsLinkedin /></div>
              </a>
              <a href={cardData?.twitter_link || cardData?.twitter || "#"} target={cardData?.twitter_link || cardData?.twitter ? "_blank" : undefined} rel="noreferrer" className="card-icons" title="Twitter / X">
                <div className="icon-box"><BsTwitterX /></div>
              </a>
              <a href={cardData?.fb_link || cardData?.facebook || "#"} target={cardData?.fb_link || cardData?.facebook ? "_blank" : undefined} rel="noreferrer" className="card-icons" title="Facebook">
                <div className="icon-box"><BsFacebook /></div>
              </a>
              <a href={cardData?.insta_link || cardData?.instagram || "#"} target={cardData?.insta_link || cardData?.instagram ? "_blank" : undefined} rel="noreferrer" className="card-icons" title="Instagram">
                <div className="icon-box"><BsInstagram /></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

