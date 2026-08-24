import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import { useRef } from "react";
import {
    BsLinkedin, BsTwitterX, BsInstagram,
    BsTelephoneFill, BsEnvelopeFill, BsGlobe,

} from "react-icons/bs";
import axios from 'axios';
import html2canvas from 'html2canvas';

const API_BASE_URL = import.meta.env.DEV
    ? 'http://127.0.0.1:8000'
    : 'https://cardify-ge3r.onrender.com';

const resolveImageSrc = (image) => {
    if (!image) {
        return '';
    }

    if (image instanceof File) {
        return URL.createObjectURL(image);
    }

    if (typeof image === 'string') {
        if (image.startsWith('data:') || image.startsWith('blob:')) {
            return image;
        }

        if (image.startsWith('http://') || image.startsWith('https://')) {
            if (window.location.protocol === 'https:' && image.startsWith('http://')) {
                return image.replace('http://', 'https://');
            }
            return image;
        }

        const cleanPath = image.startsWith('/') ? image : `/${image}`;
        return `${API_BASE_URL}${cleanPath}`;
    }

    return '';
};


const CardPreview = () => {
    const [showLink, setShowLink] = useState(false);
    const [showQR, setShowQR] = useState(false);

    const cardRef = useRef(null);
    const qrRef = useRef(null);

    const { uuid } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const user_id = Number(localStorage.getItem('user_id'));

    const [cardData, setCardData] = useState(location.state?.cardData || null);
    const [image, setImage] = useState(location.state?.image || null);
    const [loading, setLoading] = useState(!location.state?.cardData);

    const cardlink = cardData?.uuid || uuid
        ? `${window.location.origin}/card/${cardData?.uuid || uuid}`
        : `${window.location.origin}`;

    useEffect(() => {
        if (location.state?.cardData) {
            setCardData(location.state.cardData);
            setImage(location.state.image || location.state.cardData.image);
            setLoading(false);
            return;
        }

        setLoading(true);
        axios.get(`${API_BASE_URL}/api/cards/?format=json`)
            .then(res => {
                const allCards = Array.isArray(res.data) ? res.data : [];
                let targetCard = null;

                if (uuid) {
                    targetCard = allCards.find(c => c.uuid === uuid);
                } else if (user_id) {
                    const userCards = allCards.filter(c => c.user === user_id);
                    targetCard = userCards[userCards.length - 1] || null;
                }

                if (targetCard) {
                    setCardData(targetCard);
                    setImage(targetCard.image);
                }
            })
            .catch(err => {
                console.error("Error fetching card data:", err);
            })
            .finally(() => setLoading(false));
    }, [uuid, user_id, location.state]);




    const [imageDataUrl, setImageDataUrl] = useState('');

    useEffect(() => {
        const src = resolveImageSrc(image);
        if (!src) {
            setImageDataUrl('');
            return;
        }

        let cancelled = false;

        const inlineImage = async (imgSrc) => {
            try {
                if (imgSrc.startsWith('data:') || imgSrc.startsWith('blob:')) {
                    return imgSrc;
                }

                const response = await fetch(imgSrc, { mode: 'cors' });
                if (!response.ok) return imgSrc;
                const blob = await response.blob();
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result || imgSrc);
                    reader.onerror = () => resolve(imgSrc);
                    reader.readAsDataURL(blob);
                });
            } catch (err) {
                console.warn('Image inlining skipped, using direct URL:', err);
                return imgSrc;
            }
        };

        inlineImage(src)
            .then(dataUrl => {
                if (!cancelled) setImageDataUrl(dataUrl || src);
            })
            .catch(() => {
                if (!cancelled) setImageDataUrl(src);
            });

        return () => {
            cancelled = true;
        };
    }, [image]);

    const waitForCardRender = async () => {
        if (!cardRef.current) return;

        const cardImage = cardRef.current.querySelector('img');
        if (!cardImage) return;

        if (cardImage.complete) return;

        await new Promise((resolve, reject) => {
            cardImage.onload = resolve;
            cardImage.onerror = reject;
        });
    };

    const downloadCard = async () => {
        if (!cardRef.current) return;

        try {
            await document.fonts.ready;
            await waitForCardRender();

            const canvas = await html2canvas(cardRef.current, {
                backgroundColor: null,
                scale: window.devicePixelRatio || 2,
                useCORS: true,
                allowTaint: false,
                logging: false,
            });

            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'BusinessCard.png';
            link.click();
        } catch (err) {
            console.error('Download failed:', err);
            toast.error("Couldn't download card image.", { className: 'toast-error-glow' });
        }
    };


    const downloadQR = async () => {
        if (!qrRef.current) return;
        await document.fonts.ready;

        try {
            const canvas = await html2canvas(qrRef.current, {
                backgroundColor: null,
                scale: window.devicePixelRatio || 2,
                useCORS: true,
                allowTaint: false,
                logging: false,
            });
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'BusinessCardQR.png';
            link.click();
        } catch (err) {
            console.error("QR download failed:", err);
            toast.error("Couldn't download QR code.", { className: 'toast-error-glow' });
        }
    };


    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(cardlink);
            toast.success('Link copied successfully!', {
                className: 'toast-success-glow'
            });
        }
        catch (err) {
            toast.error('Failed to copy link', {
                className: 'toast-error-glow'
            });
        }
    }

    return (
        <div className="page-white-theme">
            {/* Clean Topbar Header */}
            <div className="dash-topbar mb-4">
                <div>
                    <h1 className="dash-welcome-title">Business Card Preview</h1>
                    <p className="dash-welcome-sub">
                        Your digital card is ready. Preview, share link, or download your high-resolution card & QR code.
                    </p>
                </div>

                <div className="dash-topbar-actions">
                    <Link to="/card-details" className="dash-btn-create">
                        <i className="bi bi-plus-lg me-1"></i>
                        <span>Create Another Card</span>
                    </Link>
                </div>
            </div>

            {loading ? (
                <div className="p-5 text-center bg-white border rounded-4">
                    <div className="spinner-border text-primary mb-3" role="status"></div>
                    <p className="text-muted mb-0">Loading your card preview...</p>
                </div>
            ) : !cardData ? (
                <div className="empty-state-white">
                    <h4 className="fw-bold text-dark mb-2">No Card Selected</h4>
                    <p className="text-muted mb-4">You haven't created a business card yet. Create your first card in seconds.</p>
                    <Link to="/card-details" className="dash-btn-create d-inline-flex">
                        <i className="bi bi-plus-lg me-1"></i>
                        <span>Create Your First Card</span>
                    </Link>
                </div>
            ) : (
                <div className="row g-4 align-items-start">
                    {/* Left: Card Render */}
                    <div className="col-12 col-lg-7 d-flex justify-content-center">
                        <div className="card-item-white-box w-100 d-flex justify-content-center p-4">
                            <div className={`sample-preview-card p-4 border rounded-4 shadow ${cardData?.theme || 'blue'}`} ref={cardRef}>
                                <div className="card-top-content">
                                    <hr className='card-stripe' />
                                    <div className="align-items-center card-logo shadow p-2 mb-3">
                                        {image ? (
                                            <div className="profile-image">
                                                <img
                                                    src={imageDataUrl || resolveImageSrc(image)}
                                                    alt={cardData?.name || 'Profile'}
                                                    onError={(e) => {
                                                        const directSrc = resolveImageSrc(image);
                                                        if (e.target.src !== directSrc) {
                                                            e.target.src = directSrc;
                                                        }
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <span className="fw-bold fs-5 text-dark p-2">
                                                {cardData?.name ? cardData.name.charAt(0).toUpperCase() : 'C'}
                                            </span>
                                        )}
                                    </div>
                                    <span className='fw-bold fs-5 text-white'>{cardData?.name}</span><br />
                                    {cardData?.job && (
                                        <>
                                            <span className='text-info'>{cardData.job}</span><br />
                                        </>
                                    )}
                                    {cardData?.company && (
                                        <span className='text-white-50 small'>{cardData.company}</span>
                                    )}
                                    <hr />
                                    {cardData?.tel && (
                                        <div className="contact-row mb-1">
                                            <BsTelephoneFill className="text-info me-2" />
                                            <span className='text-white-50 small'>{cardData.tel}</span>
                                        </div>
                                    )}
                                    {cardData?.email && (
                                        <div className="contact-row mb-1">
                                            <BsEnvelopeFill className="text-info me-2" />
                                            <span className='text-white-50 small'>{cardData.email}</span>
                                        </div>
                                    )}
                                    {cardData?.address && (
                                        <div className="contact-row mb-1">
                                            <BsGlobe className="text-info me-2" />
                                            <span className='text-white-50 small'>{cardData.address}</span>
                                        </div>
                                    )}
                                    <hr className="my-3" />
                                </div>

                                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 pt-1">
                                    <div className="bg-white p-1 rounded-2 shadow-sm">
                                        <QRCode value={cardlink} size={256} style={{ height: "45px", maxWidth: "45px", width: "45px" }} />
                                    </div>
                                    <div className="d-flex card-social-icons gap-2">
                                            <a
                                                href={cardData?.linkedin_link || cardData?.linkedin || "#"}
                                                target={cardData?.linkedin_link || cardData?.linkedin ? "_blank" : undefined}
                                                rel="noreferrer"
                                                className="card-icons"
                                                title="LinkedIn"
                                            >
                                                <div className="icon-box"><BsLinkedin /></div>
                                            </a>
                                            <a
                                                href={cardData?.twitter_link || cardData?.twitter || "#"}
                                                target={cardData?.twitter_link || cardData?.twitter ? "_blank" : undefined}
                                                rel="noreferrer"
                                                className="card-icons"
                                                title="Twitter / X"
                                            >
                                                <div className="icon-box"><BsTwitterX /></div>
                                            </a>
                                            <a
                                                href={cardData?.insta_link || cardData?.instagram || "#"}
                                                target={cardData?.insta_link || cardData?.instagram ? "_blank" : undefined}
                                                rel="noreferrer"
                                                className="card-icons"
                                                title="Instagram"
                                            >
                                                <div className="icon-box"><BsInstagram /></div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="col-12 col-lg-5">
                        <div className="builder-form-card">
                            <h4 className="fw-bold text-dark mb-3">Quick Actions</h4>

                            <div className="d-flex flex-column gap-3">
                                <button
                                    className="btn btn-primary d-flex align-items-center justify-content-center gap-2 py-2 fw-semibold rounded-3"
                                    onClick={downloadCard}
                                >
                                    <i className="bi bi-download"></i>
                                    <span>Download Card Image</span>
                                </button>

                                <button
                                    className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2 py-2 fw-semibold rounded-3"
                                    onClick={() => setShowQR(true)}
                                >
                                    <i className="bi bi-qr-code"></i>
                                    <span>View & Download QR Code</span>
                                </button>

                                <button
                                    className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2 py-2 fw-semibold rounded-3"
                                    onClick={() => setShowLink(true)}
                                >
                                    <i className="bi bi-share"></i>
                                    <span>Share Card Link</span>
                                </button>
                            </div>

                            {showLink && (
                                <div className="showlink-overlay">
                                    <div className="showlink">
                                        <button className="close-btn" onClick={() => setShowLink(false)}>
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                        <input type="text" value={cardlink} readOnly />
                                        <div className="py-2 d-flex justify-content-center align-items-center mt-2 gap-2">
                                            <button className='btn btn-sm btn-primary' onClick={copyLink}>
                                                <i className="bi bi-clipboard me-1"></i> Copy Link
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {showQR && (
                                <div className="showqr-overlay">
                                    <div className="showqr">
                                        <button className="close-btn" onClick={() => setShowQR(false)}>
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                        <div className="qr-wrapper bg-white p-3 rounded-3" ref={qrRef}>
                                            <QRCode value={cardlink} size={256} style={{ height: "auto", maxWidth: "250px", width: "200px" }} />
                                        </div>
                                        <div className="py-2 d-flex justify-content-center align-items-center mt-3">
                                            <button className='btn btn-sm btn-primary' onClick={downloadQR}>
                                                <i className="bi bi-download me-1"></i> Download QR Image
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardPreview;


