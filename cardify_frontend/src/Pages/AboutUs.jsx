import React from 'react'
import { Link } from 'react-router-dom'

const AboutUs = () => {
  return (
    <>
<div className="container d-flex justify-content-center align-items-center">
        <div className="col-md-10 ">
       <div className="about-us">
         <h1>Our Brief Introduction</h1>
        <p className='mt-3'><strong>Cardify</strong> is a modern technology company focused on transforming the way professionals and businesses create, manage, and share their digital identities. Our mission is to make networking simpler, smarter, and more professional by providing innovative digital solutions for business communication.

As our flagship platform, <strong>Cardify Digital Business Card</strong> enables users to create fully customizable business cards in just a few clicks. Users can design stylish digital cards, share them instantly through QR codes or direct links, and download high-quality versions for both online and offline use. With an intuitive interface and mobile-friendly experience, Cardify helps professionals build a strong digital presence and connect effortlessly in today’s fast-moving business world.
</p>
       </div>

       <div className="image-container mt-4 bg-info-subtle rounded-2">
        <img src="slider1.png" alt="Cardify" className="img-fluid border rounded-2 p-3"/>
        <p className="text-center mt-2 text-dark">A example of your dashboard</p>
       </div>

       <div className="terms-and-condition mt-3">
        <h3>Terms and Conditions</h3>

        <div className="terms-text mt-3">
            Welcome to <strong>Cardify</strong>. These Terms and Conditions govern your use of the Cardify platform, website, and services. By accessing or using our services, you agree to comply with these terms. If you do not agree with any part of these terms, please discontinue using our platform.

<h4>1. Use of Services</h4>

Cardify provides digital business card creation and sharing services that allow users to design, customize, and distribute their professional identity online. Users are responsible for providing accurate information and ensuring that their content does not violate any applicable laws or third-party rights.

<h4> 2. User Account Responsibility</h4>

Users are responsible for maintaining the confidentiality of their account information and for all activities performed through their account. Cardify is not responsible for any unauthorized access caused by the user's failure to protect their account details.

<h4>3. User Content</h4>

Users retain ownership of the information, images, logos, and other content they upload to Cardify. By using our platform, users grant Cardify permission to store and process this content only for providing and improving our services.

Users must not upload content that is illegal, misleading, offensive, or infringes upon the rights of others.

<h4>4. Service Availability</h4>

Cardify strives to provide reliable and uninterrupted services; however, we do not guarantee that the platform will always be available without interruptions due to maintenance, technical issues, or circumstances beyond our control.

<h4>5. Intellectual Property</h4>

All Cardify branding, designs, logos, features, and platform-related materials are the intellectual property of Cardify and may not be copied, modified, or distributed without prior permission.

<h4>6. Limitation of Liability</h4>

Cardify shall not be held responsible for any loss, damage, or inconvenience resulting from the use or inability to use our services, including loss of data or unauthorized access caused by factors beyond our control.

<h4>7. Modifications to Terms</h4>

Cardify reserves the right to update or modify these Terms and Conditions at any time. Changes will become effective once published on our platform. Continued use of the service after updates indicates acceptance of the revised terms.

<h4>8. Termination</h4>

Cardify reserves the right to suspend or terminate accounts that violate these Terms and Conditions or misuse the platform.

<h4>9. Contact Us</h4>

If you have any questions or concerns regarding these Terms and Conditions, please contact the Cardify support team.

        </div>
       </div>
      <div className="i-agree py-3 d-flex justify-content-center align-items-center flex-column">
<div className="">
          <input type="checkbox" id="agree"  name="agree" required></input>
        <label htmlFor="agree"className="ms-3">I agree to the Terms and Conditions</label>
</div>
        <Link to={"/register"} className="btn btn-outline-primary text-white ms-3">Proceed to Register</Link>
      </div>

    </div>
    
</div>
      
    </>
  )
}

export default AboutUs
