import axios from 'axios';
import React, { useEffect, useState } from 'react';
import QRCode from "react-qr-code";
import { Link, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { API_BASE_URL } from '../config';
import { BsSearch, BsPlusLg, BsPlusCircleDotted, BsEye, BsTrash, BsShare } from 'react-icons/bs';
import { FaShareAlt } from 'react-icons/fa';

const Cardlist = () => {
  const { uuid } = useParams();
  const user_id = Number(localStorage.getItem("user_id"));
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/api/cards/?format=json`)
      .then(res => setCards(res.data || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const cardlink = (cardUuid) => `${window.location.origin}/card/${cardUuid}`;

  const filteredCards = cards
    .filter(item => user_id === item.user)
    .filter(item => (item.name || '').toLowerCase().includes(search.toLowerCase()));

  const handleShare = (cardUuid) => {
    const shareUrl = cardlink(cardUuid);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      toast.success('Card link copied to clipboard!', { className: 'toast-success-glow' });
    } else {
      toast.info(`Card link: ${shareUrl}`);
    }
  };

  const handleDelete = (cardUuid) => {
    let toastId = toast.warning(
      <div>
        <p className="mb-2 text-dark">Are you sure you want to delete this card?</p>
        <button className='btn btn-danger btn-sm me-2' onClick={() => deleteCard(cardUuid, toastId)}>Delete</button>
        <button className='btn btn-secondary btn-sm' onClick={() => toast.dismiss(toastId)}>Cancel</button>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        className: 'toast-warning-glow',
      }
    );
  };

  const deleteCard = async (cardUuid, toastId) => {
    toast.dismiss(toastId);
    try {
      await axios.delete(`${API_BASE_URL}/api/cards/${cardUuid}/`);
      setCards(prevCards => prevCards.filter((card) => card.uuid !== cardUuid));
      toast.success("Card deleted successfully", { className: 'toast-success-glow' });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete card", { className: 'toast-error-glow' });
    }
  };

  return (
    <div className="page-white-theme">
      <div className="container py-4">
        {/* Page Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center page-white-header gap-3">
          <div>
            <h1 className="page-white-title">My Cards</h1>
            <p className="page-white-subtitle">
              Manage, preview, share, and customize all your digital business cards.
            </p>
          </div>

          <Link to="/card-details" className="dash-btn-create">
            <BsPlusLg size={13} />
            <span>Create New Card</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="row mb-4">
          <div className="col-12 col-md-6 col-lg-5">
            <div className="position-relative">
              <BsSearch className="search-icon-pos" size={15} />
              <input
                type="text"
                className="search-input-white"
                placeholder="Search cards by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Cards Grid or Empty State */}
        {loading ? (
          <div className="p-5 text-center bg-white border rounded-4">
            <div className="spinner-border text-primary mb-3" role="status"></div>
            <p className="text-muted mb-0">Loading your cards...</p>
          </div>
        ) : filteredCards.length > 0 ? (
          <div className="row justify-content-start align-items-stretch g-4">
            {filteredCards.map(item => (
              <div key={item.uuid} className="col-12 col-md-6 col-lg-4 d-flex">
                <div className="card-item-white-box w-100 d-flex flex-column justify-content-between">
                  {/* Card Visual / Header */}
                  <div>
                    <div className={`sample-preview-card p-4 border rounded-4 shadow-sm ${item.theme || 'blue'}`}>
                      <hr className='card-stripe' />
                      <div className="align-items-center card-logo shadow p-2 mb-3">
                        {item.image ? (
                          <div className="profile-image">
                            <img
                              src={item.image}
                              alt={item.name}
                            />
                          </div>
                        ) : (
                          <span className='fw-bold fs-5 text-dark p-2 card-text-wrap'>{item.name || 'Card'}</span>
                        )}
                      </div>
                      <span className='fw-bold fs-5 card-text-wrap text-white'>{item.name}</span><br />
                      <span className='text-info card-text-wrap'>{item.job}</span><br />
                      <span className='text-secondary card-text-wrap text-white-50'>{item.company}</span>
                      <hr />
                      {item.tel && (
                        <div className="contact-row mb-1">
                          <i className="bi bi-telephone-fill text-info me-2"></i>
                          <span className='text-white-50 card-text-wrap'>{item.tel}</span>
                        </div>
                      )}
                      {item.email && (
                        <div className="contact-row mb-1">
                          <i className="bi bi-envelope-fill text-info me-2"></i>
                          <span className='text-white-50 card-text-wrap'>{item.email}</span>
                        </div>
                      )}
                      {item.address && (
                        <div className="contact-row mb-1">
                          <i className="bi bi-globe text-info me-2"></i>
                          <span className='text-white-50 card-text-wrap'>{item.address}</span>
                        </div>
                      )}
                      <hr />
                      <div className="d-flex justify-content-between align-items-center">
                        <QRCode value={cardlink(item.uuid)} size={256} style={{ height: "45px", maxWidth: "45px", width: "45px" }} />
                        <div className="d-flex gap-2">
                          {item.linkedin_link && (
                            <a href={item.linkedin_link} target="_blank" rel="noreferrer" className="card-icons">
                              <i className="bi bi-linkedin text-info fs-6"></i>
                            </a>
                          )}
                          {item.twitter_link && (
                            <a href={item.twitter_link} target="_blank" rel="noreferrer" className="card-icons">
                              <i className="bi bi-twitter text-info fs-6"></i>
                            </a>
                          )}
                          {item.insta_link && (
                            <a href={item.insta_link} target="_blank" rel="noreferrer" className="card-icons">
                              <i className="bi bi-instagram text-info fs-6"></i>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-muted small mb-1">
                        Created: {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Recently'}
                      </p>
                      <p className="text-muted small mb-0">
                        Views: <strong className="text-dark">{item.views || 0}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="d-flex gap-2 mt-3 pt-3 border-top">
                    <Link
                      to={`/card-preview/${item.uuid}`}
                      className="btn btn-sm btn-primary flex-grow-1 d-flex align-items-center justify-content-center gap-1"
                      state={{ cardData: item, image: item.image }}
                    >
                      <BsEye size={14} />
                      <span>View</span>
                    </Link>

                    <button
                      className="btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-center px-3"
                      title="Share Card"
                      onClick={() => handleShare(item.uuid)}
                    >
                      <FaShareAlt size={13} />
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center px-3"
                      title="Delete Card"
                      onClick={() => handleDelete(item.uuid)}
                    >
                      <BsTrash size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state-white">
            <div className="mb-3 text-primary">
              <BsPlusCircleDotted size={54} />
            </div>
            <h4 className="fw-bold text-dark mb-2">No cards available</h4>
            <p className="text-muted mb-4" style={{ maxWidth: '400px', margin: '0 auto' }}>
              {search ? `No cards found matching "${search}". Try another keyword.` : "You haven't created any digital cards yet. Create your first card in seconds."}
            </p>
            <Link to="/card-details" className="dash-btn-create d-inline-flex">
              <BsPlusLg size={13} />
              <span>Create New Card</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cardlist;

