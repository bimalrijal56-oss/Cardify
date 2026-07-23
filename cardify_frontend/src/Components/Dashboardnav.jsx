import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";

const Dashboardnav = () => {

  let location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) {
      setIsLoggedIn(true);
      setUsername(user);

    }
  }, []);



  const handleLogout = () => {
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">CARDIFY</Link>
          <button className="navbar-toggler text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end text-bg-dark dashboard-offcanvas" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Welcome !! {username}</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">

              <div className="navbar-nav gap-4">

                <div
                  className={`nav-link-box d-flex justify-content-center align-items-center rounded-4 ${location.pathname === "/dashboard" ? "nav-box-active" : ""
                    }`}
                >
                  <Link className="nav-links text-white me-lg-5 py-3 fs-5" to="/dashboard">
                    Dashboard
                  </Link>
                </div>

                <div
                  className={`nav-link-box d-flex justify-content-center align-items-center rounded-4 ${location.pathname === "/cardlist" ? "nav-box-active" : ""
                    }`}
                >
                  <Link className="nav-links text-white me-lg-5 py-3 fs-5" to="/cardlist">
                    Cards
                  </Link>
                </div>

                <div
                  className={`nav-link-box d-flex justify-content-center align-items-center rounded-4 ${location.pathname === "/card-preview" ? "nav-box-active" : ""
                    }`}
                >
                  <Link className="nav-links text-white me-lg-5 py-3 fs-5" to="/card-preview">
                    Card Preview
                  </Link>
                </div>

              </div>
              <div className="d-flex ms-auto auth-buttons py-4 gap-4 d-flex justify-content-center align-items-center">
                {isLoggedIn ? (
                  <>
                    <div className="username align-items-center me-2 py-2 px-5">
                      <i className="bi bi-person-circle me-2 fs-5"></i>
                      <span className='text-white   border-rounded rounded-4 fs-5'>{username}</span>
                    </div>
                    <button className="btn btn-outline-danger rounded-4 me-lg-3 py-2 fs-5" onClick={handleLogout}>Logout<i className="bi bi-box-arrow-right ms-2 fs-5"></i></button>




                  </>
                ) : (
                  <>

                    <Link className="nav-link btn btn-sm me-2  btn-outline-info text-white px-4 py-1 border-rounded rounded-4" to={"/login"}>Login</Link>
                    <Link className="nav-link btn  text-white me-lg-5 bg-info px-4 py-1 border-rounded rounded-4" to={"/register"}>Register</Link>

                  </>
                )
                }



              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Dashboardnav
