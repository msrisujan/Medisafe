import React, { useState,useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import '../DoctorDetails.css';

const DoctorAccess = ({restapi}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log("useeffect");
    // when page loads for the first time send a request to the server to get the data
    async function sendRequest() {
      try {
        const response = await restapi.get("/doctor_access");
        const responseData =  response.data;
        if (responseData.statusCode === 200) {
          setData(responseData.data);
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

  async function submitData(patient_add,access_hash){
    var text = document.getElementById("textarea").value;
    if(text.length < 1){
      alert("Please enter some data");
      return;
    }
    const response = await fetch("http://localhost:5000/send_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patient_add: patient_add,
          access_hash: access_hash,
          data: text,
        }),
      });
      const responseData = await response.json();
      if(responseData.statusCode === 200){
        alert("Data submitted successfully");
        window.location.reload();
      }
      else if(responseData.statusCode  === 403){
        alert(responseData.notify);
      }
      else{
        alert("Some error occured");
      }
  }

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  const handleBackClick = () => {
    setSelectedRow(null);
  };

  const renderTable = () => {
    if (selectedRow === null) {
      return (
        <div className={`tablecard ${blur_class}`}>
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
        <table className="table content-table">
          <thead>
            <tr>
              <th>SNum</th>
              <th>Patient Name</th>
              <th>Patient DOB</th>
              <th>Access Type</th>
              <th>Access Ends In</th>
              <th>Request Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr className='table-row' key={index} onClick={() => {
              if(row.request_status === "active"){
                handleRowClick(index)
              }}}>
                <td>{row.snum}</td>
                <td>{row.patient_name}</td>
                <td>{row.patient_dob}</td>
                <td>{row.access_type}</td>
                <td>{row.access_endsin}</td>
                <td>{row.request_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      );
    } else {
      const selectedData = data[selectedRow];
      const doctorDetails = selectedData.doctorDetails;

      return (
        <div className={`doctor-details ${blur_class}`}>
          <div className='hide table'>

          </div>
          <div className="left-card">
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
            <div className='details'>
            <h2>Row Details</h2>
            <p>SNum: {selectedData.snum}</p>
            <p>Patient Name: {selectedData.patient_name}</p>
            <p>Patient DOB: {selectedData.patient_dob}</p>
            <p>Access Type: {selectedData.access_type}</p>
            <p>Access Ends In: {selectedData.access_endsin}</p>
            <button onClick={handleBackClick} className="back-button button">
              Back to Table
            </button>
            </div>
          </div>
          <div className="right-card">
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
            <div className='details'>
              <h2>Doctor Details</h2>
              <textarea name="data" id="textarea" cols="30" rows="10"></textarea>
              <input type="file" />
              <button onClick={submitData(selectedData.patient_add,selectedData.access_hash)}>Submit</button>
            </div>
          </div>
          <div className={`tablecard ${blur_class}`}>
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
        <table className="table content-table">
          <thead>
            <tr>
              <th>SNum</th>
              <th>Past Prescription</th>
              <th>Added By</th>
              <th>Added On</th>
              <th>Attachments</th>
            </tr>
          </thead>
          <tbody>
            {selectedData.patient_history.map((row, index) => (
              <tr className='table-row' key={index}>
                <td>{row.snum}</td>
                <td>{row.past_prescription}</td>
                <td>{row.addedby}</td>
                <td>{row.addedon}</td>
                <td>{row.attachments}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
      );
    }
  
  };
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
    <div className='doctor-details-container'>
      <h1 className="center-heading">Doctor Details</h1>
      {renderTable()}
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

export default DoctorAccess;
