import React, { useState } from 'react';
import '../DoctorDetails.css';

const DoctorDetails = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const data = [
    // Replace this with your data for 10 rows
    {
      date: 'Date 1',
      hospitalName: 'Hospital 1',
      problem: 'Problem 1',
      doctorName: 'Doctor 1',
      doctorDetails: {
        name: 'Dr. John Doe',
        age: 35,
        qualification: 'MD, Cardiology',
        experience: '10 years',
        rating: 4.5,
      },
    },
    {
      date: 'Date 2',
      hospitalName: 'Hospital 2',
      problem: 'Problem 2',
      doctorName: 'Doctor 2',
      doctorDetails: {
        name: 'Dr. Jane Smith',
        age: 40,
        qualification: 'MD, Pediatrics',
        experience: '12 years',
        rating: 4.8,
      },
    },
    // Add more rows here
  ];

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
              <th>Date</th>
              <th>Hospital Name</th>
              <th>Problem</th>
              <th>Doctor Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr className='table-row' key={index} onClick={() => handleRowClick(index)}>
                <td>{row.date}</td>
                <td>{row.hospitalName}</td>
                <td>{row.problem}</td>
                <td>{row.doctorName}</td>
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
            <p>Date: {selectedData.date}</p>
            <p>Hospital Name: {selectedData.hospitalName}</p>
            <p>Problem: {selectedData.problem}</p>
            <p>Doctor Name: {selectedData.doctorName}</p>
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
            <p>Name: {doctorDetails.name}</p>
            <p>Age: {doctorDetails.age}</p>
            <p>Qualification: {doctorDetails.qualification}</p>
            <p>Experience: {doctorDetails.experience}</p>
            <p>Rating: {doctorDetails.rating}</p>
            </div>
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

export default DoctorDetails;
