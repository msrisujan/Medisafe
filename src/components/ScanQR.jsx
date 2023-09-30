import React,{useEffect, useState} from "react";
import { QRCodeSVG } from "qrcode.react";
import { QrReader } from "react-qr-reader";
import "../ScanQR.css";
import { Navigate } from "react-router-dom";

function ScanQR({accountAddress}) {
    const [showCamera, setShowCamera] = useState(false);
    const toggleCamera = () => {
        setShowCamera(!showCamera);
      };
    const [qrscan, setQrscan] = useState(' ');

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBlurred, setIsBlurred] = useState(false);
    const [requestAccess, setRequestAccess] = useState(false);
    const [role, setRole] = useState('');
    const [data, setData] = useState({});
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
      setIsBlurred(!isBlurred); // Toggle the blur effect when the menu is opened/closed
    };
    const hamburger_class = isMenuOpen ? 'hamburger hamburger--spring is-active' : 'hamburger hamburger--spring';
    const blur_class = isBlurred ? 'blur' : '';

    useEffect(() => {
        // when page loads for the first time send a request to the server to get the data
        async function sendRequest() {
          try {
            const response = await fetch("http://localhost:5000/user_info", {
              method: "GET",
            });
            const responseData = await response.json();
            if (responseData.statusCode === 200) {
              console.log(responseData.data);
              setRole(responseData.data.role);

            }
            else{
              <Navigate to="/" />
            }
          } catch (error) {
            console.log(error);
          }
        }
        sendRequest();
      }
      , []);
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
                onResult={async(result, error) => {
                    if (!!result) {
                      const response = await fetch("http://localhost:5000/get_scan_details", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          add: result?.text,
                        }),
                      });
                      const responseData = await response.json();
                      if ( role === "DOCTOR" ) {
                        if ( responseData.statusCode === 403 ) {
                          alert(responseData.notify);
                        }
                        else if ( responseData.statusCode === 200 ) {

                          setData(responseData.data);
                          if(responseData.data.is_having_access === true){
                            console.log(responseData.data.patient_history)
                          }
                          else if(responseData.data.is_having_emergency === true){
                            console.log(responseData.data.patient_history)
                          }
                          else{
                            setRequestAccess(true);
                          }
                        }
                      }
                      else if ( role === "PATIENT" ) {
                        if ( responseData.statusCode === 403 ) {
                          alert(responseData.notify);
                        }
                        else if ( responseData.statusCode === 200 ) {
                          if(responseData.data.is_having_access === true){
                            
                          }
                          else if(responseData.data.is_having_emergency_access === true){
                            console.log(responseData.data.patient_history)
                          }
                          else{
                            
                          }
                        }
                      }

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
                value={`${accountAddress}`}
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
      {
        // if length of data is greater than 0 then show the data
        Object.keys(data).length > 0 ? (
          <div className="patient-details">
            <div className="patient-info">
              <p>name: {data.patient_details.name}</p>
              <p>dob: {data.patient_details.DOB}</p>
              <p>role: {data.patient_details.role}</p>
              <p>address: {data.user_add}</p>
            </div>
          </div>
        ) : (
          <div></div>
        )

      }



      {
        requestAccess ? (
          <div className="request-access">
            <form>
              <select>
                <option value="2">Emergency Access</option>
                <option value="1">Normal Access</option>
              </select>
              <textarea placeholder="Enter your note"></textarea>
              <button>Request Access</button>
            </form>
          </div>
        ) : (
          <div></div>
        )
      }
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