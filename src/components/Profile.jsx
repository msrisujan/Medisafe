import React from 'react';
import '../Profile.css'; // Import the CSS file

const Profile = ({ hospitalsVisited, doctorsVisited, emergencyCases, contacts, isBlurred }) => {
  const profileClass = isBlurred ? 'profile-section blurred' : 'profile-section';

  return (
    <div className={profileClass}>
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
      <div className="profile-pic">
        <img src="big-profile-pic.png" alt="Profile Pic" />
      </div>
      <div className="profile-info">
        <p>No of hospitals visited using Medisafe: {hospitalsVisited}</p>
        <p>Doctors visited: {doctorsVisited}</p>
        <p>Data on Medisafe ecosystem:</p>
        <p>Emergency cases triggered: {emergencyCases}</p>
        <p>Contacts: {contacts} <i class="fa-regular fa-address-book"></i></p>
      </div>
    </div>
  );
};

export default Profile;
