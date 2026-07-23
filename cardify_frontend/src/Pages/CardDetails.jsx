import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Counter from '../Components/Counter'
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify";
import QRCode from "react-qr-code";

const CardDetails = () => {
  const location= useLocation()
  const navigate = useNavigate();

  useEffect(()=>{
    if(!location.state?.theme){
      navigate("/",{replace:true});
      toast.error("Page refreshed.Please select a theme again.",{className:'toast-error-glow'});
    }
  },[location,navigate]);


  const theme = location.state?.theme;

  const [image,setImage]=useState(null);

  

  const [cardData,setCardData]= useState({
    name:"",
    job:"",
    company:"",
    address:"",
    tel:"",
    email:"",
    website:"",
    facebook:"",
    twitter:"",
    linkedin:"",
    instagram:"",
    theme:theme || ""
  })

  const handleChange=(e)=>{
    setCardData({
      ...cardData,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit=(e)=>{
    e.preventDefault();

    const formData = new FormData();
    formData.append("image",image);
    formData.append("name",cardData.name);
    formData.append("job",cardData.job);
    formData.append("company",cardData.company);
    formData.append("address",cardData.address);
    formData.append("tel",cardData.tel);
    formData.append("email",cardData.email);
    formData.append("web_url",cardData.website);
    formData.append("fb_link",cardData.facebook);
    formData.append("twitter_link",cardData.twitter);
    formData.append("linkedin_link",cardData.linkedin);
    formData.append("insta_link",cardData.instagram);
    formData.append("theme",cardData.theme);
    formData.append("user",localStorage.getItem("user_id"));

    console.log(localStorage.getItem("user_id"));
    for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
}
    axios.post("https://cardify-production-6e02.up.railway.app/api/cards/",formData,
      {
        headers:{
          "Content-Type":"multipart/form-data"
        }
      }
    )
    .then((response)=>{
       
      
      toast.success("Card created successfully", { className: 'toast-success-glow' },)
      navigate(`/card-preview/${response.data.uuid}`,{state:{cardData:cardData,image:image}});
      
    })
    .catch((error)=>{
      toast.error(error.response?.data || "An error occurred while creating the card."),{className:'toast-error-glow'};
    })
  }
  return (
    <>

      <section className='hero'>
<div className="container">
          <div className="row align-items-center">
          <div className="infocard col-md-12 px-5">

            <div className="hero-tag ">
              <span className='hero-tag-dot'></span>
              <span className="text-info">Trusted by 50,000+ Professionals</span>
            </div>
            <h1 className="hero-subtitle">Customize Your Business Card,</h1>
            <h1 className="hero-subtitle text-info">According To Your Needs</h1>
            <p className="hero-description">Customize your business card to reflect your unique style and professional brand.</p>






          </div>






        </div>
</div>

      </section>



      <div className=" container-fluid card-builder d-flex flex-column justify-content-center align-items-center">

        <div className="row g-4 w-100 m-0 align-items-start">
          <div className="infocard col-md-7 px-5 py-3 d-flex flex-column justify-content-center align-items-center">


            <h1 className="hero-subtitle">Create Your <br /> Business Card,</h1>

            <p className="details-des">Fill in your details and see the live preview before sharing. <br /> No limits.</p>


      <form onSubmit={handleSubmit} className='w-100'>

                    <div className=" img-upload my-5">

              <div className="upload-header px-3 ">
                <i className="bi bi-camera fs-4 me-3 text-info"></i>
                <span className="fs-5 text-secondary">Profile Photo</span>
              </div>
              <hr className="w-100 border border-secondary my-1" />

              <div className="col-md-7 d-flex flex-column justify-content-center align-items-center  w-100">

                <div className=" click-to-upload d-flex flex-column align-items-center justify-content-center mt-4">

                  <i className="bi bi-cloud-upload fs-3"></i>
                 
                  <input type="file" onChange={(e)=>setImage(e.target.files[0])} className=" profile text-info"></input>
                  <p className="text-secondary py-2">PNG, JPG up to 5MB · Recommended 400×400</p>

                </div>

              </div>

            </div>



            <div className="col-md-7 img-upload my-5">

              <div className="upload-header px-3 ">
                <i className="bi bi-person-fill fs-4 me-3 text-info"></i>
                <span className="fs-5 text-secondary">Basic information</span>
              </div>
              <hr className="w-100 border border-secondary my-1" />

              <div className="col-md-7 d-flex flex-column justify-content-center align-items-center  w-100">

                <div className="input-row ">
                  <div className="input-group-custom">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="Enter your name" className="form-control" value={cardData.name} onChange={handleChange}></input>

                  </div>
                  <div className="input-group-custom">
                    <label htmlFor="job">Job</label>
                    <input type="text" id="job" name="job" placeholder="Enter your job" className="form-control"value={cardData.job}onChange={handleChange}></input>

                  </div>
                </div>
                <div className="input-row">


                  <div className="input-group-custom">
                    <label htmlFor="company">Company</label>
                    <input type="text" id="company" name="company" placeholder="Enter your company" className="form-control"value={cardData.company}onChange={handleChange}></input>

                  </div>

                  <div className="input-group-custom">
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" name="address" placeholder="Enter your address" className="form-control"value={cardData.address}onChange={handleChange}></input>

                  </div>

                </div>



















              </div>

            </div>




            <div className="col-md-7 img-upload my-5">

              <div className="upload-header px-3 ">
                <i className="bi bi-person-badge fs-4 me-3 text-info"></i>
                <span className="fs-5 text-secondary">Contact Information</span>
              </div>
              <hr className="w-100 border border-secondary my-1" />

              <div className="col-md-7 d-flex flex-column justify-content-center align-items-center  w-100">


                <div className="input-row ">
                  <div className="input-group-custom">
                    <label htmlFor="phone">Phone no</label>
                    <input type="text" id="tel" name="tel" placeholder="Enter your phone" className="form-control" value={cardData.tel} onChange={handleChange}></input>

                  </div>
                  <div className="input-group-custom">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" placeholder="Enter your email" className="form-control" value={cardData.email} onChange={handleChange}></input>

                  </div>
                </div>
                <div className="input-row">



                  <div className="input-group-custom">
                    <label htmlFor="website">Website Url</label>
                    <input type="text" id="website" name="website" placeholder="Enter your website url" className="form-control" value={cardData.website} onChange={handleChange}></input>

                  </div>

                </div>
              </div>
              

            </div>





            <div className="col-md-7 img-upload my-5">

              <div className="upload-header px-3 ">
                <i className="bi bi-share-fill fs-4 me-3 text-info"></i>
                <span className="fs-5 text-secondary">Social Media Links</span>
              </div>
              <hr className="w-100 border border-secondary my-1" />

                    <div className="input-row ">
                  <div className="input-group-custom">
                    <label htmlFor="facebook">Facebook</label>
                    <input type="text" id="facebook" name="facebook" placeholder="Enter your facebook" className="form-control" value={cardData.facebook} onChange={handleChange}></input>

                  </div>
                  <div className="input-group-custom">
                    <label htmlFor="twitter">Twitter</label>
                    <input type="text" id="twitter" name="twitter" placeholder="Enter your twitter url" className="form-control" value={cardData.twitter} onChange={handleChange}></input>

                  </div>
                </div>
                <div className="input-row">


                  <div className="input-group-custom">
                    <label htmlFor="LinkedIn">LinkedIn</label>
                    <input type="text" id="linkedin" name="linkedin" placeholder="Enter your LinkedIn url" className="form-control" value={cardData.linkedin} onChange={handleChange}></input>

                  </div>

                  <div className="input-group-custom">
                    <label htmlFor="Instagram">Instagram</label>
                    <input type="text" id="instagram" name="instagram" placeholder="Enter your Instagram url" className="form-control" value={cardData.instagram} onChange={handleChange}></input>

                  </div>

                  

                </div>
                

            </div>
<button className="create-btn w-50 border rounded-3" type="submit">Create</button>
      </form>


















          </div>


          <div className="sticky-scroll col-md-5 ">
            <div className="d-flex flex-column align-items-start">
            <div className="example-tag">
              <span className='example-tag-dot'></span>
              <span className="example-text">Card Example</span>
            </div>

            </div>

            <div className={`sample-detail-card  p-4 border rounded-4 shadow ${cardData?.theme}`}>
              <hr className='card-stripe' />
              <div className="align-items-center card-logo shadow p-2  bg-info">
                <span className='fw-bold fs-5 text-dark p-2 '>AK</span>
              </div>
              <span className='fw-bold fs-5 '>Alexander Kimm</span><br />
              <span className='text-info'>Senior Product Designer</span><br />
              <span className='text-'>Apple Inc.</span>
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
      

      </div>
   

    </>
  )
}

export default CardDetails
