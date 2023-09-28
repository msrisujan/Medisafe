import React,{useState} from "react";
import { QRCodeSVG } from "qrcode.react";
import { QrReader } from "react-qr-reader";
import "../ScanQR.css";

function ScanQR() {
    const [showCamera, setShowCamera] = useState(false);
    const toggleCamera = () => {
        setShowCamera(!showCamera);
      };
    const [qrscan, setQrscan] = useState(' ');

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBlurred, setIsBlurred] = useState(false);
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
      setIsBlurred(!isBlurred); // Toggle the blur effect when the menu is opened/closed
    };
    const hamburger_class = isMenuOpen ? 'hamburger hamburger--spring is-active' : 'hamburger hamburger--spring';
    const blur_class = isBlurred ? 'blur' : '';

    return (
        <div className="navbar-container">
      <nav className="navbar"> {/* Use the class name directly */}
        <div className="logo">
          <img src="logo.png" alt="Medisafe Logo" />
          <span>Medisafe</span>
        </div>
        <div className="profile">
          <img src="profilepic.png" alt="Profile Pic" />
          <span>Hello, </span>
          <button class={hamburger_class} type="button" onClick={toggleMenu}>
            <span class="hamburger-box">
              <span class="hamburger-inner"></span>
            </span>
          </button>  
          
        </div>
      </nav>
        <div className={`card ${blur_class}`}>
            <div class="tools">
                <div class="circle">
                  <span class="red box"></span>
                </div>
                <div class="circle">
                  <span class="yellow box"></span>
                </div>
                <div class="circle">
                  <span class="green box"></span>
                </div>
              </div>
            {showCamera ? (
          <div className="camera">
            <QrReader
                delay={300}
                onResult={(result, error) => {
                    if (!!result) {
                      setQrscan(result?.text);
                    }
          
                    if (!!error) {
                      console.info(error);
                    }
                  }}

                style={{ height: '20px', width: '20px' }}
                /> 
            <a href={qrscan}>link:{qrscan}</a>
            
          </div>
        ) : (
            <div className="user-info">
            <QRCodeSVG
                value="https://www.youtube.com/"
                bgColor = {"#023252"}
                fgColor = {"#6EE7F2"}
                />
                <p>Username: username</p>
                <p>Medisafe ID: id</p>
            </div>
        )}                 
        <button onClick={toggleCamera} className="button">
          {showCamera ? 'Show QR' : 'Scan QR'}
        </button>
      </div>
      <div className={`dropdown-menu ${isMenuOpen ? 'open' : ''}`}>
        <button>Doctors dealed</button>
        <button>Recent reports</button>
        <button>Add extra data</button>
        <button>Edit contacts</button>
        <hr />
        <button>Logout</button>
        <div className="social-icons">
          <i className="fab fa-facebook"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-instagram"></i>
        </div>
      </div>
      </div>
  );
}

export default ScanQR;