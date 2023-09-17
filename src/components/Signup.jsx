import React, { useState } from 'react';
import '../Signup.css'; // Import your CSS file for styling

function Signup() {
  const [isDoctor, setIsDoctor] = useState(true);

  const toggleUserType = () => {
    setIsDoctor((prevIsDoctor) => !prevIsDoctor);
  };

  return (
    <div className="signup-container">
      <div className={`content ${isDoctor ? 'left' : 'right'}`}>
        <div className={`left-content ${isDoctor ? '' : 'blur'}`}>
          <img
            src="doctor-image.png"
            alt="Doctor"
            className="image"
          />
          <p className="label">Doctor</p>
        </div>
        <label className={`switch ${isDoctor ? 'left' : 'right'}`}>
          <input
            type="checkbox"
            className="toggle-button"
            onChange={toggleUserType}
            checked={!isDoctor}
          />
          <span className="slider"></span>
        </label>
        <div className={`right-content ${isDoctor ? 'blur' : ''}`}>
          <img
            src="patient-image.png"
            alt="Patient"
            className="image"
          />
          <p className="label">Patient</p>
        </div>
      </div>
      <div className="signup-form">
        <h2>Sign up as a {isDoctor ? 'Doctor' : 'Patient'}</h2>
        {/* Add your signup form fields here */}
        {/* Example: */}
        <form>
          <label>
            Username:
            <input type="text" />
          </label>
          <label>
            Email:
            <input type="email" />
          </label>
          <label>
            wallet address:
            <input type="text" />
          </label>
          <label>
            Password:
            <input type="password" />
          </label>
          <label>
            Confirm Password:
            <input type="password" />
          </label>

          <button type="submit" className='btn1'>Sign Up</button>
        </form>
      </div>
      <ul class="background">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      </ul>
    </div>
  );
}

export default Signup;
