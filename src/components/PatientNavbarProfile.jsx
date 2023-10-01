import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../Profile.css'; // Import the CSS file
import Profile from './DoctorProfile.jsx';

const NavbarProfile = ({loggedIn,handleDisconnectWalletClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsBlurred(!isBlurred); // Toggle the blur effect when the menu is opened/closed
  };
  const hamburger_class = isMenuOpen ? 'hamburger hamburger--spring is-active' : 'hamburger hamburger--spring';
  if(loggedIn===true){
  return (
    
    <div className="navbar-container">
      
      <nav className="navbar"> {/* Use the class name directly */}
        <div className="logo">
          <img src="logo.png" alt="Medisafe Logo" />
          <span>Medisafe</span>
        </div>
        <div className="profile">
          <img src="profilepic.png" alt="Profile Pic" />
          {/* <span>Hello, {userName}</span> */}
          <button class={hamburger_class} type="button" onClick={toggleMenu}>
            <span class="hamburger-box">
              <span class="hamburger-inner"></span>
            </span>
          </button>  
        </div>
      </nav>
    <Profile
        hospitalsVisited={10}
        doctorsVisited={5}
        emergencyCases={3}
        contacts={5}
        isBlurred={isBlurred} // Pass the blur state to the Profile component
      />
    <div className={`dropdown-menu ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/doctor_access">Patients dealed</Link>        
        <Link to="/profile_qr">QR Scan</Link>
        <hr />
        <button onClick={handleDisconnectWalletClick}>Logout</button>
        <div className="social-icons">
          <i className="fab fa-facebook"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-instagram"></i>
        </div>
      </div>
    
    </div>
    
  )}
  else{
    return(<Navigate to='/'/>)
  };
};

export default NavbarProfile;
