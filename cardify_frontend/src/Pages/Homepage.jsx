import React, { useEffect, useState } from 'react'
import Base from '../Base'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Counter from '../Components/Counter'

const Homepage = () => {

  const location = useLocation()
  const[isLoggedIn,setIsLoggedIn]= useState(false);
  const[username,setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const user=localStorage.getItem("username");
    if(user){
      setIsLoggedIn(true);
      setUsername(user);
      navigate('/dashboard');
    }

  },[]);

  const [isVideoOpen,setIsVideoOpen]= useState(false);



  return (
    <>
      <section className='hero'>
<div className="container">
          <div className="row align-items-center">
          <div className="infocard col-md-7 px-5">

            <div className="hero-tag ">
              <span className='hero-tag-dot'></span>
              <span className="text-info">Trusted by 50,000+ Professionals</span>
            </div>
            <h1 className="hero-subtitle"> Your Digital <br /> Business Card,</h1>
            <h1 className="hero-subtitle text-info">Reinvented</h1>
            <p className="hero-description">Create, customize and share your professional identity <br /> instantly using QR codes and smart links. No printing. <br /> No limits.</p>
            <div className=" hero-buttons py-3">
              <Link to="/register" className="getstart btn btn-info text-dark px-4 py-3  shadow rounded-4 fw-bold"><i className="bi bi-pencil  mx-2 mx-md-3"></i>Get Started</Link>
              <button onClick={()=>setIsVideoOpen(true)} className="watch-demo btn  text-white px-4 py-3 shadow rounded-4 fw-bold mx-3"><i className="bi bi-play-circle mx-1 mx-md-3"></i>Watch Demo</button>
            </div>


            {
              isVideoOpen && (
                <div className="show-video-overlay">
                <div className="show-video">
               <button className="close-video-btn" onClick={()=>setIsVideoOpen(false)}>
                <i className="bi bi-x-lg"></i>
               </button>
                <div className="video-wrapper">
                <video src="demo-video.mp4" controls autoPlay></video>
                </div>
                </div>

                </div>
              )
            }

            <div className=" counters d-md-flex justify-content-between col-md-7 py-3">
              <div className="cards-created ">
                <div className="counter">

                  <Counter end={5000} />
                </div>
                <p className="counter-text">Registered Users</p>
              </div>

              <div className="qr-scans">

                <div className="counter">

                  <Counter end={50000} />
                </div>
                <p className="counter-text">Cards Created</p>
              </div>

              <div className="satisfaction">

                <div className="counter">

                  <Counter end={5000} />
                </div>

                <p className="counter-text">Cards Shared</p>

              </div>


            </div>





          </div>


          <div className="col-md-5 sample-card p-4 border rounded-4 shadow ">
            <hr className='card-stripe' />
            <div className="align-items-center card-logo shadow p-2  bg-info">
              <span className='fw-bold fs-5 text-dark p-2 '>AK</span>
            </div>
            <span className='fw-bold fs-5 '>Alexander Kimm</span><br />
            <span className='text-info'>Senior Product Designer</span><br />
            <span className='text-secondary'>Apple Inc.</span>
            <hr />
            <i className="bi bi-telephone-fill text-info"></i><span className='text-secondary px-3'>+1 123 456 7890</span><br />
            <i className="bi bi-envelope-fill text-info"></i><span className='text-secondary px-3'>contact@alexander.in</span><br />
            <i className="bi bi-globe text-info"></i><span className='text-secondary px-3'>alexkim.design</span>
            <hr />
            <div className="d-flex justify-content-between">
              <img src='qr.png' alt='qr code' height={50} width={50}></img>
              <div className=" d-flex">

                <a href="#" className="card-icons"><div className="icon-box
              ">
                  <i className="bi bi-linkedin  fs-6"></i></div></a>
                <a href="#" className="card-icons"><div className="icon-box
              ">
                  <i className="bi bi-twitter  fs-6"></i></div></a>
                <a href="#" className="card-icons"><div className="icon-box
              ">
                  <i className="bi bi-instagram  fs-6"></i></div></a>
              </div>

            </div>


          </div>



        </div>
</div>

      </section>

      <div className=" teams col-md-12 d-md-flex justify-content-md-evenly  justify-content-center  py-3 px-5 px-md-0">
        <p className='teams-text'>TRUSTED TEAMS AT</p>
        <p className="teams-text">Google</p>
        <p className="teams-text">Microsoft</p>
        <p className="teams-text">Apple</p>
        <p className="teams-text">Figma</p>


      </div>

      <div className="features col-md-12 d-flex-column justify-content-center align-items-center py-2 ">
        <div className="features-heading py-3 text-center">


          <span className="features-tag">FEATURES</span><br />
          <span className="features-header text-secondary">Everything You Need to</span><br />
          <span className="features-header text-info">Network Smarter</span>

          <p className="features-dis py-2">Powerful tools designed to make your professional identity<br />unforgettable in the digital age.</p>

        </div>
        <div className="features-container py-2" >
          <div className="features-box"data-aos="fade-up" >
            <div className="features-icon p-4">
              <i className="bi bi-qr-code text-info fs-1"></i>
            </div>
            <div className="px-4 ">
              <span className="features-title">QR Code Scanning</span><br />
              <span className="features-dis">Easily scan and share your digital business card with a simple QR code.</span>

            </div>


          </div>
          <div className="features-box"data-aos="fade-up">

            <div className="features-icon p-4">
              <i className="bi bi-person-circle text-info fs-1"></i>
            </div>
            <div className="px-4">
              <span className="features-title">Contact Share</span><br />
              <span className="features-dis">Recipients can easily save and access your contact information.</span>

            </div>
          </div>
          <div className="features-box"data-aos="fade-up">

            <div className="features-icon p-4">
              <i className="bi bi-palette text-info fs-1"></i>
            </div>
            <div className="px-4">
              <span className="features-title">Professional templates</span><br />
              <span className="features-dis">Choose premium templates to make your business cards stand out.</span>
            </div>
          </div>
          <div className="features-box"data-aos="fade-up">

            <div className="features-icon p-4">
              <i className="bi bi-share-fill text-info fs-1"></i>
            </div>
            <div className="px-4">
              <span className="features-title">Share</span><br />
              <span className="features-dis">You can easily share your business cards using qr codes and links.</span>
            </div>



          </div>
          <div className="features-box"data-aos="fade-up">

            <div className="features-icon p-4 mt-4 ">
              <i className="bi bi-phone text-info fs-1"></i>
            </div>
            <div className="px-4">
              <span className="features-title">Mobile freedom</span><br />
              <span className="features-dis">Perfectly optimized for every device.Your cards look stunning whether on mobile or desktop.</span>
            </div>



          </div>
          <div className="features-box"data-aos="fade-up">

            <div className="features-icon p-4 mt-4 mt-md-0">
              <i className="bi bi-clock-fill text-info fs-1"></i>
            </div>
            <div className="px-4">
              <span className="features-title">Cards History</span><br />
              <span className="features-dis">Keeps track of your all past created cards which can be shared easily later on.</span>
            </div>



          </div>
        </div>

















      </div>
















      <div className="templates col-md-12 d-flex-column justify-content-center align-items-center py-2 ">
        <div className="templates-heading py-3 text-center">


          <span className="templates-tag">TEMPLATES</span><br />
          <span className="templates-header text-secondary">Beautifully Designed</span><br />
          <span className="templates-header text-info">Card Styles</span>



        </div>
        <div className="templates-container py-2">
          <div className="templates-box blue"data-aos="fade-up">

            <div className="overlay">
              <Link  to="/login" className="preview-btn" state={{theme:"blue"}}>Use Template</Link>
            </div>

            <div className="template-name d-flex flex-column align-items-center text-center d-md-0   px-4">
              <span className="templates-title">Premium Blue</span><br />
              <span className="templates-tag px-5">Premium</span>

            </div>


          </div>
          <div className="templates-box white"data-aos="fade-up">

            <div className="overlay">
              <Link  to="/login" className="preview-btn" state={{theme:"white"}}>Use Template</Link>
            </div>


            <div className=" template-name d-flex flex-column align-items-center text-center d-md-0  px-4">
              <span className="templates-title">Simple White</span><br />
              <span className="templates-tag px-5">Clean</span>

            </div>
          </div>
          <div className="templates-box gold"data-aos="fade-up">


            <div className="overlay">
              <Link  to="/login" className="preview-btn"state={{theme:"gold"}}>Use Template</Link>
            </div>

            <div className="template-name d-flex flex-column align-items-center text-center d-md-0  px-4">
              <span className="templates-title">Luxury Gold</span><br />
              <span className="templates-tag px-5">Popular</span>
            </div>
          </div>
          <div className="templates-box black"data-aos="fade-up">

            <div className="overlay">
              <Link  to="/login" className="preview-btn" state={{theme:"black"}}>Use Template</Link>
            </div>

            <div className="template-name d-flex flex-column align-items-center text-center d-md-0  px-4">
              <span className="templates-title">Stylish Black</span><br />
              <span className="templates-tag px-5">Trending</span>
            </div>



          </div>
          <div className="templates-box purple"data-aos="fade-up">
            <div className="overlay">
              <Link  to="/login" className="preview-btn" state={{theme:"purple"}}>Use Template</Link>
            </div>

            <div className="template-name d-flex flex-column align-items-center text-center d-md-0  px-4">
              <span className="templates-title">Light Purple</span><br />
              <span className="templates-tag px-5">Creative</span>
            </div>



          </div>
          <div className="templates-box green"data-aos="fade-up">

            <div className="overlay">
              <Link  to="/login" className="preview-btn" state={{theme:"green"}}>Use Template</Link>
            </div>
            <div className="template-name d-flex flex-column align-items-center text-center d-md-0  px-4">
              <span className="templates-title">Royal Green</span><br />
              <span className="templates-tag px-5">Royal</span>
            </div>



          </div>
        </div>



























      </div>










      <div className="process col-md-12 d-flex-column justify-content-center align-items-center py-2 ">
        <div className="process-heading py-3 text-center">


          <span className="process-tag">PROCESS</span><br />
          <span className="process-header text-secondary">Up and Running in</span><br />
          <span className="process-header text-info">3 simple steps</span>

          <p className="process-dis py-2">Create your business card in just 3 easy steps.<br />Make it unforgettable in the digital age.</p>

        </div>
        <div className="process-container d-md-flex justify-content-evenly py-2">
          <div className="process-box d-flex flex-column align-items-center text-center">

            <div className="sn ">
              <span className="text-info fs-3 fw-bold">1</span>
            </div>
            <div className="step"data-aos="fade-up">

              <i className="bi bi-person-fill-add fs-1 text-info"></i>
            </div>
            <p className="step-title">Create Your Profile</p>
            <p className="step-dis">Sign up and fill your professional <br /> details-name,title,company, <br />contact-info and social links.</p>

          </div>
         <div className="process-box d-flex flex-column align-items-center text-center">
            <div className="sn">

              <span className="text-info fs-3 fw-bold">2</span>
            </div>
            <div className="step"data-aos="fade-up">
              <i className="bi bi-sliders fs-1 text-info"></i>
            </div>

            <p className="step-title">Customize Your Card</p>
            <p className="step-dis">Choose template and personalize <br /> every detail until it perfectly <br />represents you.</p>

          </div>
         <div className="process-box d-flex flex-column align-items-center text-center">

            <div className="sn">

              <span className="text-info fs-3 fw-bold">3</span>
            </div>
            <div className="step"data-aos="fade-up">

              <i className="bi bi-box-arrow-right fs-1 text-info"></i>

            </div>

            <p className="step-title">Share via QR or Link</p>
            <p className="step-dis">Share your unique card link or show <br />your QR code. Recipients instantly <br />access and save your contact.</p>

          </div>




        </div>



























      </div>






    </>
  )
}

export default Homepage
