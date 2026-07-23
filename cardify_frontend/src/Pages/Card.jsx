import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import QRCode from "react-qr-code";

const API_BASE_URL = 'https://cardify-production-6e02.up.railway.app';

const resolveImageSrc = (image) => {
  if (!image) {
    return '';
  }

  if (image.startsWith('http')) {
    return image;
  }

  return `${API_BASE_URL}${image.startsWith('/') ? '' : '/'}${image}`;
};

const Card = () => {
  const location = useLocation();
  const { uuid } = useParams();
  // const { cardData, image } = location.state || {};

  const [cardData, setCardData] = useState(null);
  const cardlink = `https://cardify-plum.vercel.app/card/${cardData?.uuid}`;
  useEffect(() => {
    axios.get(`https://cardify-production-6e02.up.railway.app/api/cards/${uuid}`)
      .then((response => {
        setCardData(response.data);
      }))

  }, [uuid]);


  if (!cardData) {
    return <h2>Loading....</h2>
  }
  return (
    <>
      <div className="py-5 col-md-12 d-flex flex-column justify-content-center align-items-center">

        <div className="col-md-5 ">
          <div className={`sample-preview-card p-4 border rounded-4 shadow ${cardData?.theme}`}>
            <hr className='card-stripe' />
            <div className="align-items-center card-logo shadow p-2  mb-3">
              {cardData.image ? (
                <img
                  src={resolveImageSrc(cardData.image)}
                  alt={cardData.name}
                  width={200}
                  className="img-fluid"
                />

              ) : (
                <span className='fw-bold fs-5 text-dark p-2 card-text-wrap'>{cardData.name}</span>
              )}
            </div>
            <span className='fw-bold fs-5 card-text-wrap'>{cardData.name}</span><br />
            <span className='text-info card-text-wrap'>{cardData.job}</span><br />
            <span className='text-secondary card-text-wrap'>{cardData.company}</span>
            <hr />
            <i className="bi bi-telephone-fill text-info"></i><span className='text-secondary px-3 card-text-wrap'>{cardData?.tel}</span><br />
            <div className="contact-row">
              <i className="bi bi-envelope-fill text-info"></i><span className='text-secondary px-3 card-text-wrap'>{cardData?.email}</span><br />
            </div>
            <div className="contact-row">
              <i className="bi bi-globe text-info"></i><span className='text-secondary px-3 card-text-wrap'>{cardData?.address}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <QRCode value={cardlink} size={256} style={{ height: "50px", maxWidth: "45px", width: "45px" }}></QRCode>
              <div className=" d-flex">

                <a href={cardData.linkedin_link} className="card-icons"><div className="icon-box
              ">
                  <i className="bi bi-linkedin  fs-6"></i></div></a>
                <a href={cardData.twitter_link} className="card-icons"><div className="icon-box
              ">
                  <i className="bi bi-twitter  fs-6"></i></div></a>
                <a href={cardData.instagram_link} className="card-icons"><div className="icon-box
              ">
                  <i className="bi bi-instagram  fs-6"></i></div></a>
              </div>

            </div>


          </div>
        </div>
      </div>


    </>
  )
}

export default Card
