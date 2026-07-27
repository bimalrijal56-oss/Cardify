import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import QRCode from "react-qr-code";
import { toast, ToastContainer } from "react-toastify";
import Counter from '../Components/Counter';
import { BsArrowUpLeft, BsArrowUpRight } from 'react-icons/bs';


const Dashboard = () => {

  const user_id = Number(localStorage.getItem("user_id"));
  
  
  const { uuid } = useParams();
  const cardlink = `https://cardify-plum.vercel.app/card/${uuid}`;
  const [cards, setCards] = useState([]);
  
  
  useEffect(() => {
    axios.get('https://cardify-production-6e02.up.railway.app/api/cards/?format=json')
      .then(res => {
        setCards(res.data);
        
      })
      .catch(err => console.log(err))

  }, []);

  const filteredCards = cards.filter(item => user_id === item.user)


  const handleDelete = (uuid) => {
    let toastId = toast.warning(
      <div>
        <p>Are you sure you want to delete this card?</p>
        <button className='btn btn-danger btn-sm me-2'onClick={()=>deleteCard(uuid,toastId)}>Delete</button>
        <button className='btn btn-secondary btn-sm' onClick={()=>toast.dismiss(toastId)}>Cancel</button>
      </div>,
      {
        autoClose:false,
        closeOnClick:false,
        className:'toast-warning-glow',
      }
    );
  }

  const deleteCard = async (uuid,toastId)=>{
    toast.dismiss(toastId);
    try{
      await axios.delete(`https://cardify-production-6e02.up.railway.app/api/cards/${uuid}/`);
      setCards(prevCards => prevCards.filter((card)=> card.uuid !== uuid));
      toast.success("Card deleted sucessfully",{className:'toast-success-glow'});
    }
    catch(error){
      console.log(error);
      toast.error("Failed to delete card",{className:'toast-error-glow'});
    }
  };

const cardsCount = filteredCards.length;
const username = localStorage.getItem("username");


const [totalClicks, setTotalClicks]= useState(0);

useEffect(()=>{
  axios.get(`https://cardify-production-6e02.up.railway.app/dashboard-stats/?user_id=${user_id}`)
  .then(res=>{
    setTotalClicks(res.data.total_clicks);
  })
  .catch((error)=>console.log(error))
},[user_id]);




  return (
    <>
      <div className="dash-page">
<div className="row g-0 mx-0">
  <div className="col-12 px-0 dash-header d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column fw-bold">
            <h1 className="welcome-text">Welcome back,{username}!! 👋</h1>
            <p className="text-white">Design. Share. Connect. Your professional identity starts here.</p>
          </div>
          <div className="notification  d-flex align-items-center">
            <Link to={'#'}><i className="bi bi-bell fs-3 text-white"></i></Link>
            <p className="mb-0 ms-2 text-white">Notifications</p>
          </div>
        </div>
      </div>




        <div className="dash-info col-md-12 d-flex-column justify-content-center align-items-center py-5 ">
          <h2 className="px-4">Your Dashboard</h2>
          <div className="dash-info-container py-2" >
            <div className="dash-info-box" data-aos="fade-up" >
              <div className="dash-info-icon grid p-4">
                <i className="bi bi-grid-fill  fs-4 grid-icon"></i>
              </div>
              <div className="px-4 dash-info-text">
                <div className="row wrapper">
                  <h5 className="dash-info-title">Overview</h5>
                  <span className="dash-info-dis">See your cards in real time.</span>
                </div>

              </div>


            </div>
            <div className="dash-info-box" data-aos="fade-up">

              <div className="dash-info-icon card p-4">
                <i className="bi bi-person-vcard  fs-4  card-icon"></i>
              </div>
              <div className="px-4 dash-info-text">
                <div className="row wrapper">
                  <h5 className="dash-info-title">Total Cards</h5>
                  <span className="dash-info-dis text-bold fs-4"><Counter end={cardsCount}/></span>
                  <p>Active cards</p>
                </div>

              </div>
            </div>


            <div className="dash-info-box" data-aos="fade-up">

              <div className="dash-info-icon people p-4">
                <i className="bi bi-people-fill  fs-4 people-icon"></i>
              </div>
              <div className="px-4 dash-info-text">
                <div className="row wrapper">
                  <h5 className="dash-info-title">Organized</h5>
                  <span className="dash-info-dis">Everything you need is organized & secured.</span>
                </div>
              </div>
            </div>

            
            <div className="dash-info-box" data-aos="fade-up">

              <div className="dash-info-icon clicks p-4">
                <div style={{fontSize:"30px", color:"white"}}>
  <BsArrowUpLeft  size={28}  className="right-arrow"/>
</div>
              </div>
              <div className="px-4 dash-info-text">
                <div className="row wrapper">
                  <h5 className="dash-info-title">Total Clicks</h5>
                  <span className="dash-info-dis text-bold fs-4"><Counter end={totalClicks}/></span>
                </div>
              </div>
            </div>
            

          </div>

















        </div>
      </div>

      <div className=" py-3">
        <h2 className="px-4">Recent Cards</h2>

        {
          filteredCards.length > 0 ? (
            <div className="your-cards-grid my-3">
              {
                filteredCards.slice(0, 3).map(item => (

                  <div key={item.uuid} className="card-align" >

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
                          <Link to={`/card-preview/${item.uuid}`} className="btn btn-view btn-primary text-dark me-5 mt-2 " state={{ cardData: item, image: item.image }}> View Card</Link>
                          <button onClick={()=>handleDelete(item.uuid)} className="btn btn-outline-danger text-dark mt-2">Delete Card</button>
                        </div>
                      </div>

                    </div>














                  </div>


                ))
              }
              <div className="">
                <Link to="/cardlist" className="view-button btn-outline-info">View All</Link>
              </div>
            </div>

          ) : (
            <h1 className="px-5"> Sorry no cards Available</h1>
          )



        }
      </div>

      <div className="temp-dash-container py-3">
        <h2 className="p-4">Create New One</h2>

        <div className="templates-dash-container py-2">
          <div className="templates-box dash-blue" data-aos="fade-up">

            <div className="overlay">
              <Link to="/card-details" className="preview-btn" state={{ theme: "blue" }}>Use Template</Link>
            </div>

            <div className="template-dash-name d-flex  align-items-center text-center p-3">
              <span className="templates-dash-title">Premium Blue</span><br />


            </div>


          </div>
          <div className="templates-box dash-white" data-aos="fade-up">

            <div className="overlay">
              <Link to="/card-details" className="preview-btn" state={{ theme: "white" }}>Use Template</Link>
            </div>


            <div className=" template-dash-name d-flex  align-items-center text-center p-3">
              <span className="templates-dash-title">Simple White</span><br />


            </div>
          </div>
          <div className="templates-box dash-gold" data-aos="fade-up">


            <div className="overlay">
              <Link to="/card-details" className="preview-btn" state={{ theme: "gold" }}>Use Template</Link>
            </div>

            <div className="template-dash-name d-flex  align-items-center text-center   p-3">
              <span className="templates-dash-title">Luxury Gold</span><br />

            </div>
          </div>
          <div className="templates-box dash-black" data-aos="fade-up">

            <div className="overlay">
              <Link to="/card-details" className="preview-btn" state={{ theme: "black" }}>Use Template</Link>
            </div>

            <div className="template-dash-name d-flex  align-items-center text-center  p-3">
              <span className="templates-dash-title">Stylish Black</span><br />

            </div>



          </div>
          <div className="templates-box dash-purple" data-aos="fade-up">
            <div className="overlay">
              <Link to="/card-details" className="preview-btn" state={{ theme: "purple" }}>Use Template</Link>
            </div>

            <div className="template-dash-name d-flex  align-items-center text-center   p-3">
              <span className="templates-dash-title">Light Purple</span><br />

            </div>



          </div>
          <div className="templates-box dash-green" data-aos="fade-up">

            <div className="overlay">
              <Link to="/card-details" className="preview-btn" state={{ theme: "green" }}>Use Template</Link>
            </div>
            <div className="template-dash-name d-flex align-items-center text-center   p-3">
              <span className="templates-dash-title">Royal Green</span><br />

            </div>



          </div>
        </div>
      </div>


    </>
  )
}

export default Dashboard
