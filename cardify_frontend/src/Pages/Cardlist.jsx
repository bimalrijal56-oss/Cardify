import axios from 'axios';
import React, { useEffect, useState } from 'react'
import QRCode from "react-qr-code";
import AOS from "aos";
import { Link, useParams } from 'react-router-dom';
import Dashboardnav from '../Components/Dashboardnav';
import { toast, ToastContainer } from "react-toastify";

const Cardlist = () => {

  const { uuid } = useParams();
  const user_id = Number(localStorage.getItem("user_id"));
  const [cards, setCards] = useState([]);
  useEffect(() => {
    axios.get('https://cardify-production-6e02.up.railway.app/api/cards/?format=json')
      .then(res => setCards(res.data))
      .catch(err => console.log(err))
  }, []);

  const [search, setSearch] = useState("");

  const cardlink = `https://cardify-plum.vercel.app/card/${uuid}`;


  const filteredCards = cards.filter(item => user_id === item.user).filter(item => item.name.toLowerCase().includes(search.toLocaleLowerCase()));
  const cardsCount= cards.filter(item => user_id === item.user).length;
  localStorage.setItem("cardsCount", cardsCount);




const handleDelete = (uuid)=>{

  let toastId = toast.warning(
    <div>
      <p>Are you sure you want to delete this card?</p>
      <button className='btn btn-danger btn-sm me-2' onClick={()=>deleteCard(uuid,toastId)}>Delete</button>
      <button className='btn btn-secondary btn-sm'onClick={()=>toast.dismiss(toastId)}>Cancel</button>
    </div>,
    {
      autoClose:false,
      closeOnClick:false,
      className:'toast-warning-glow',
    }
  );
};

const deleteCard = async (uuid,toastId)=>{
  toast.dismiss(toastId);
   try{
    await axios.delete(`https://cardify-production-6e02.up.railway.app/api/cards/${uuid}/`);
    setCards(prevCards => prevCards.filter((card)=> card.uuid !== uuid));
    toast.success("Card deleted successfully",{className:'toast-success-glow'});
  }

  catch(error){
    console.log(error);
    toast.error("Failed to delete card",{className:'toast-error-glow'});
  }
   
}





  return (
    <>

      <section className='hero-preview'>
        <div className="container">
          <div className="row align-items-center">
            <div className="infocard col-md-12 px-5">

              <h1 className="hero-subtitle">Watch Your Created  Cards</h1>
              <h1 className="hero-subtitle text-info">From Starting <i class="bi bi-arrow-down"></i></h1>
              <p className="hero-description text-white">Yor card is generated according to your specification,have a look and share or save according to need.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container my-4">
        <div className="row">
          <div className="col-12  d-flex justify-content-between  align-items-centersearch-header">

            <div className="search-container">
              <input type="text" className="search-input" placeholder="Search cards..." onChange={(e) => setSearch(e.target.value)} ></input>
              <div className="search-box px-2">
                <i className="bi bi-search fs-4" ></i>
              </div>
            </div>
            <Link to={'/'} className="btn btn-outline-info text-white mt-2">Create New</Link>
          </div>
          

        </div>

        {
          filteredCards.length > 0 ? (
            <div className="row justify-content-center align-items-center my-5">
              {
                filteredCards.map(item => (

                  <div key={item.uuid} className="card-align col-12 col-md-6 col-xl-4 mb-4 d-flex justify-content-center" >

                    <div className=" card-cover" data-aos="fade-up">

                      <div className="card-envelope">
                        <div className={`sample-preview-card p-4 border rounded-4 shadow ${item.theme}`}>
                          <hr className='card-stripe' />
                          <div className="align-items-center card-logo shadow p-2  mb-3">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                width={200}
                                className="img-fluid"
                              />

                            ) : (
                              <span className='fw-bold fs-5 text-dark p-2 card-text-wrap'>{item.name}</span>
                            )}
                          </div>
                          <span className='fw-bold fs-5 card-text-wrap'>{item.name}</span><br />
                          <span className='text-info card-text-wrap'>{item.job}</span><br />
                          <span className='text-secondary card-text-wrap'>{item.company}</span>
                          <hr />
                          <i className="bi bi-telephone-fill text-info"></i><span className='text-secondary px-3 card-text-wrap'>{item?.tel}</span><br />
                          <div className="contact-row">
                            <i className="bi bi-envelope-fill text-info"></i><span className='text-secondary px-3 card-text-wrap'>{item?.email}</span><br />
                          </div>
                          <div className="contact-row">
                            <i className="bi bi-globe text-info"></i><span className='text-secondary px-3 card-text-wrap'>{item?.address}</span>
                          </div>
                          <hr />
                          <div className="d-flex justify-content-between">
                            <QRCode value={cardlink} size={256} style={{ height: "50px", maxWidth: "45px", width: "45px" }}></QRCode>
                            <div className=" d-flex">

                              <a href={item.linkedin_link || '#'} className="card-icons"><div className="icon-box
              ">
                                <i className="bi bi-linkedin  fs-6"></i></div></a>
                              <a href={item.twitter_link || '#'} className="card-icons"><div className="icon-box
              ">
                                <i className="bi bi-twitter  fs-6"></i></div></a>
                              <a href={item.instagram_link || '#'} className="card-icons"><div className="icon-box
              ">
                                <i className="bi bi-instagram  fs-6"></i></div></a>
                            </div>

                          </div>


                        </div>

                      </div>
                      <div className="card-info">
                        <div className="created-at">
                          <p className='text-dark'>Created at: {item.created_at}</p>
                        </div>
                        <div className="envelope-buttons">
                          <Link to={`/card-preview/${item.uuid}`} className="btn btn-view btn-primary text-dark me-5 mt-2" state={{ cardData: item, image: item.image }}> View Card</Link>
                          <button className="btn btn-outline-danger text-dark mt-2" onClick={()=> handleDelete(item.uuid)}>Delete Card</button>
                        </div>
                      </div>

                    </div>














                  </div>

                ))
              }
            </div>

          ) : (
            <h1> Sorry no cards Available</h1>
          )



        }

      </div>

    </>
  )
}

export default Cardlist
