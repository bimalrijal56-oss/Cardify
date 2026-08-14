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
import { domToPng } from "modern-screenshot";

const API_BASE_URL = import.meta.env.DEV
    ? 'http://127.0.0.1:8000'
    : 'https://cardify-production-6e02.up.railway.app';

const resolveImageSrc = (image) => {
    if (!image) {
        return '';
    }

    if (image instanceof File) {
        return URL.createObjectURL(image);
    }

    if (typeof image === 'string' && image.startsWith('http')) {
        return image;
    }

    if (typeof image === 'string') {
        return `${API_BASE_URL}${image.startsWith('/') ? '' : '/'}${image}`;
    }

    return '';
};


const CardPreview = () => {

    const [showLink, setShowLink] = useState(false);
    const [showQR, setShowQR] = useState(false);

    const cardRef = useRef(null);
    const qrRef = useRef(null);



    const { uuid } = useParams();
    const cardlink = `https://cardify-plum.vercel.app/card/${uuid}`;

    const location = useLocation();
    const navigate = useNavigate();

    const [cardData, setCardData] = useState(location.state?.cardData || null);
    const [image, setImage] = useState(location.state?.image || null);
    const [loading, setLoading] = useState(!location.state);

    useEffect(() => {
        if (location.state) {
            return;
        }

        axios.get(`${API_BASE_URL}/api/cards/?uuid=${uuid}`)
            .then(res => {
                const found = Array.isArray(res.data)
                    ? res.data.find(c => c.uuid === uuid)
                    : res.data;

                if (found) {
                    setCardData(found);
                    setImage(found.image);
                } else {
                    toast.error("You have to create card first.", { className: 'toast-error-glow' });
                    navigate('/dashboard');
                }
            })
            .catch(err => {
                console.log(err);
                toast.error("You haven't created a card yet.", { className: 'toast-error-glow' });
                navigate('/dashboard');
            })
            .finally(() => setLoading(false));
    }, [uuid, location.state, navigate]);




    const [imageDataUrl, setImageDataUrl] = useState('');

    useEffect(() => {
        const src = resolveImageSrc(image);
        if (!src) {
            setImageDataUrl('');
            return;
        }

        let cancelled = false;

        const inlineImage = (imgSrc) => new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth || img.width;
                canvas.height = img.naturalHeight || img.height;
                const ctx = canvas.getContext('2d');

                if (!ctx) {
                    resolve(imgSrc);
                    return;
                }

                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/png'));
            };
            img.onerror = () => reject(new Error('Image failed to load'));
            img.src = imgSrc;
        });

        inlineImage(src)
            .then(dataUrl => {
                if (!cancelled) setImageDataUrl(dataUrl);
            })
            .catch(err => {
                console.error('Failed to inline image:', err);
                if (!cancelled) setImageDataUrl(src);
            });

        return () => {
            cancelled = true;
        };
    }, [image]);

    const downloadCard = async () => {
        if (!cardRef.current) return;

        if (image && !imageDataUrl) {
            toast.info('Preparing your card image…', { className: 'toast-info-glow' });
            await new Promise(resolve => setTimeout(resolve, 300));
        }

        await document.fonts.ready;

        try {
            const dataUrl = await domToPng(cardRef.current, {
                backgroundColor: null,
                scale: window.devicePixelRatio || 2,
                fetch: {
                    requestInit: {
                        mode: 'cors',
                        cache: 'no-cache',
                    },
                },
            });

            const link = document.createElement('a');
            link.href = dataUrl;
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
            const dataUrl = await domToPng(qrRef.current, {
                backgroundColor: null,
                scale: window.devicePixelRatio || 2,
            });
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = "BusinessCardQR.png";
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
        <>

            <section className='hero-preview'>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="infocard col-md-12 px-5">

                            <h1 className="hero-subtitle"> Get A Look OF Your</h1>
                            <h1 className="hero-subtitle text-info">Business Card <i class="bi bi-arrow-down"></i></h1>
                            <p className="hero-description text-white">Yor card is generated according to your specification,have a look and share or save according to need.</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container">

                <div className="row">

                    <div className="outerline-card col-md-7 py-5">

                        <div className="col-md-6 ">
                            <div className={`sample-preview-card p-4 border rounded-4 shadow ${cardData?.theme}`} ref={cardRef}>
                                <hr className='card-stripe' />
                                <div className="align-items-center card-logo shadow p-2  mb-3">
                                    {image ? (
                                        <div className="profile-image">
                                            <img src={imageDataUrl || resolveImageSrc(image)} alt={cardData?.name} />
                                        </div>
                                    ) : (
                                        <span className="fw-bold fs-5 text-dark p-2">
                                            {cardData?.name}
                                        </span>
                                    )}
                                </div>
                                <span className='fw-bold fs-5 '>{cardData?.name}</span><br />
                                <span className='text-info'>{cardData?.job}</span><br />
                                <span className='text-secondary'>{cardData?.company}</span>
                                <hr />
                                <div className="contact-row">
                                    <BsTelephoneFill className="text-info" /><span className='text-secondary px-3'>{cardData?.tel}</span><br />
                                </div>
                                <div className="contact-row">
                                    <BsEnvelopeFill className="text-info" /><span className='text-secondary px-3'>{cardData?.email}</span><br />
                                </div>
                                <div className="contact-row">
                                    <BsGlobe className="text-info" /><span className='text-secondary px-3'>{cardData?.address}</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                                    <QRCode value={cardlink} size={256} style={{ height: "50px", maxWidth: "45px", width: "45px" }}></QRCode>
                                    <div className=" d-flex card-social-icons">

                                        <a href={cardData?.linkedin || '#'} className="card-icons"><div className="icon-box">
                                            <BsLinkedin /></div></a>
                                        <a href={cardData?.twitter || '#'} className="card-icons"><div className="icon-box">
                                            <BsTwitterX /></div></a>
                                        <a href={cardData?.instagram || '#'} className="card-icons"><div className="icon-box">
                                            <BsInstagram /></div></a>
                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>

                    <div className="preview-outline col-md-5 py-5">
                        <div className=" preview-buttons d-flex flex-column justify-content-center align-items-center py-5">

                            <div className="button link-share">
                                <button className="#" onClick={() => setShowLink(true)}>
                                    <i className="bi bi-share text-info fs-2 me-3"></i>Share through Link
                                </button>
                            </div>
                            {
                                showLink && (
                                    <div className="showlink-overlay">
                                        <div className="showlink">
                                            <button className="close-btn" onClick={() => setShowLink(false)}>
                                                <i className="bi bi-x-lg"></i>
                                            </button>
                                            <input type="text" value={cardlink} readOnly></input>

                                            <div className="py-2 d-md-flex justify-content-center align-items-center mt-2">
                                                <button className='btn btn-sm btn-outline-info text-white' onClick={copyLink}> <i className="bi bi-clipboard fs-5"></i> </button>
                                                <p className='text-white mt-2 mt-md-0 ms-2'>Copy to clipboard</p>
                                            </div>

                                        </div>
                                    </div>
                                )
                            }


                            <div className="button link-qr">
                                <button className="#" onClick={() => setShowQR(true)}>
                                    <i className="bi bi-qr-code text-info fs-3 me-3"></i>Share through QR
                                </button>
                            </div>

                            {
                                showQR && (
                                    <div className="showqr-overlay">
                                        <div className="showqr">
                                            <button className="close-btn" onClick={() => setShowQR(false)}>
                                                <i className="bi bi-x-lg"></i>
                                            </button>
                                            <div className="qr-wrapper" ref={qrRef}>
                                                <QRCode value={cardlink} size={256} style={{ height: "auto", maxWidth: "250px", width: "200px" }}></QRCode>

                                            </div>
                                            <div className="py-2 d-md-flex justify-content-center align-items-center mt-2">
                                                <button className='btn btn-sm btn-outline-info text-white' onClick={downloadQR}> <i className="bi bi-download fs-5"></i> </button>
                                                <p className='text-white mt-2 mt-md-0 ms-2'>Download QR</p>
                                            </div>


                                        </div>
                                    </div>

                                )
                            }

                            <div className="button link-download">
                                <button className="#" onClick={downloadCard}>
                                    <i className="bi bi-download text-info fs-2 me-4"></i>Download Card
                                </button>
                            </div>

                            <div className="button link-create ">
                                <Link to="/dashboard">
                                    <i className="bi bi-plus text-info fs-2 me-3"></i>Create New Card
                                </Link>
                            </div>




                        </div>

                    </div>
                </div>
            </div>






        </>
    )
}

export default CardPreview;
