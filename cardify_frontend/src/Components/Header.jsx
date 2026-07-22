import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import  { useState, useEffect } from "react";





const Header = () => {
  let location=useLocation();

  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [username,setUsername]=useState("");

  useEffect(()=>{
    const user=localStorage.getItem("username");
    if(user){
      setIsLoggedIn(true);
      setUsername(user);
    }
  },[]);



  const handleLogout=()=>{
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
  };







  return (
    <>
      
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    

        
        <Link className="navbar-brand" to={"/"}>
          <img src="/CARDIFY1.png" alt="CARDIFY" className="logo-img image-fluid"></img>

        </Link>
    <Link className="navbar-brand brand-name" to={"/"}>
    <span className='text-white fs-4 fw-bold'>CARD</span>
          <span className='text-primary fs-4 fw-bold'>IFY</span>
    
    </Link>



    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

      <div className="navbar-nav mx-auto  ">
    
        <Link  className={`${location.pathname =='/'? 'active':''} nav-links text-white me-5 `} aria-current="page" to={"/"}>Home</Link>
 
        </div>
        <div className="d-flex ms-auto auth-buttons">
        {isLoggedIn ? (
          <>
          <div className="username align-items-center me-2 py-2 px-3">
            <i className="bi bi-person-circle me-2"></i>
            <span className='text-white   border-rounded rounded-4'>{username}</span>
          </div>
          <button className="btn btn-outline-danger rounded-4 me-5 py-2 px-3" onClick={handleLogout}>Logout</button>
          </>
        ):(
          <>
          
          <Link className="nav-link btn btn-sm me-2  btn-outline-info text-white px-4 py-1 border-rounded rounded-4" to={"/login"}>Login</Link>
          <Link className="nav-link btn  text-white me-5 bg-info px-4 py-1 border-rounded rounded-4" to={"/register"}>Register</Link>
          
          </>
        )
      }



        </div>
    </div>
        
      
    </div>
 
</nav>


    </>
  )
}

export default Header
