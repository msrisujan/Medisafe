import React, { useCallback, useRef, useState} from 'react';
import Webcam from 'react-webcam';
import '../AddData.css'


const WebcamCapture = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBlurred, setIsBlurred] = useState(false);
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
  
    const capture = useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      if (setImgSrc) {
        const link = document.createElement('a');
        link.href = imageSrc;
        link.download = 'captured-image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }, [webcamRef, setImgSrc]);

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

        <div className='camera'>
            <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            />
        
        <button className='button' onClick={capture}>Capture photo</button>
        <input type="file" accept="image/*" capture="camera" />
        <button className='button'>Upload photo</button>
        </div>
        
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
  };

export default WebcamCapture;