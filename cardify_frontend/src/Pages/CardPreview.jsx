import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { BsLinkedin, BsTwitterX, BsInstagram } from "react-icons/bs";

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


    const { uuid } = useParams();
    const cardlink = `https://cardify-plum.vercel.app/card/${uuid}`;

    const location = useLocation();
    const navigate = useNavigate();

    const { cardData, image } = location.state || {};
    useEffect(() => {
        if (!location.state) {
            navigate('/dashboard');
            toast.error("You haven't created a card yet. Please create a card first.", { className: 'toast-error-glow' });
        }
    }, [location, navigate]);


    const downloadCard = async () => {
        if (!cardRef.current) return;

        await document.fonts.ready;

        const canvas = await html2canvas(cardRef.current, {
            backgroundColor: null,
            scale: window.devicePixelRatio || 2,
            useCORS: true,
        });

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "BusinessCard.png";
        link.click();
    };

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
                                        <img src={resolveImageSrc(image)} alt={cardData?.name} width={200} className="img-fluid border rounded-3"></img>

                                    ) : (
                                        <span className='fw-bold fs-5 text-dark p-2 '>{cardData?.name}</span>
                                    )}
                                </div>
                                <span className='fw-bold fs-5 '>{cardData?.name}</span><br />
                                <span className='text-info'>{cardData?.job}</span><br />
                                <span className='text-secondary'>{cardData?.company}</span>
                                <hr />
                                <i className="bi bi-telephone-fill text-info"></i><span className='text-secondary px-3'>{cardData?.tel}</span><br />
                                <div className="contact-row">
                                    <i className="bi bi-envelope-fill text-info"></i><span className='text-secondary px-3'>{cardData?.email}</span><br />
                                </div>
                                <div className="contact-row">
                                    <i className="bi bi-globe text-info"></i><span className='text-secondary px-3'>{cardData?.address}</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                                    <QRCode value={cardlink} size={256} style={{ height: "50px", maxWidth: "45px", width: "45px" }}></QRCode>
                                    <div className=" d-flex card-social-icons">

                                        <a href={cardData?.linkedin} className="card-icons"><div className="icon-box">
                                            <BsLinkedin /></div></a>
                                        <a href={cardData?.twitter} className="card-icons"><div className="icon-box">
                                            <BsTwitterX /></div></a>
                                        <a href={cardData?.instagram} className="card-icons"><div className="icon-box">
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
                                            <div className="qr-wrapper">
                                                <QRCode value={cardlink} size={256} style={{ height: "auto", maxWidth: "250px", width: "200px" }}></QRCode>
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

export default CardPreview
