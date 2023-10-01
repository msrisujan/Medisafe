import React from 'react';
import '../Profile.css'; // Import the CSS file

const Profile = ({ accountAddress, name, dob, gender,doctorsVisited,NoofRecords, isBlurred }) => {
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
        <img src="big-profile-pic.png" alt="Patient Profile" />
      </div>
      <div className="profile-info">
      <p style={{overflow:"scroll"}}><b>Address:</b> {accountAddress}</p>
      <p><b>Name: </b>{name}</p>
        <p><b>Date of Birth:</b> {dob}</p>
        <p><b>Gender:</b> {gender}</p>
        <p><b>Doctors visited:</b> {doctorsVisited}</p>
        <p><b>No.of Records Stored on Blockchain:</b> {NoofRecords}</p>
        {/* <p>Contacts: {contacts} <i class="fa-regular fa-address-book"></i></p> */}
      </div>
    </div>
  );
};

export default Profile;
