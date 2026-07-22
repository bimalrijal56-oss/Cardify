import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>


      <div className="footer text-center">
        <div className="footer-content d-flex justify-content-around">

          <div className="column1">
            <div>
              <div className="card-header d-flex align-items-center">
                <Link className="navbar-brand footer-brand" to={"/"}>
                  <img src="/CARDIFY1.png" alt="CARDIFY" className="footer-logo image-fluid"></img>

                </Link>
                <Link className="navbar-brand" to={"/"}>
                  <span className='text-white fs-3 fw-bold'>CARD</span>
                  <span className='text-primary fs-3 fw-bold'>IFY</span>

                </Link>

              </div>

              <span style={{ color: 'var(--text)' }}>Get your own personalized business card</span>
            </div>
          </div>
          <div className="column2 mt-5">
            <div className="card-body">
              <h5 className="card-title mt-2">Connect with us</h5>
              <p className="card-text">Follow us on social media for latest news and updates.</p>
              <a href="#" className="social-icons"><i className="bi bi-facebook"></i></a>
              <a href="#" className="social-icons"><i className="bi bi-instagram"></i></a>
              <a href="#" className="social-icons"><i className="bi bi-twitter"></i></a>
              <a href="#" className="social-icons"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>
        <hr />
        <div className="card-footer ">
          <span className="footer-copyright">© 2025 Cardify Inc. All rights reserved.</span>
        </div>
      </div>

    </>
  )
}

export default Footer
