import React, { useState } from 'react';
import '../Contacts.css';

function Contacts() {
  const [data, setData] = useState([
    { name: 'John Doe', relation: 'Friend', phone: '123-456-7890' },
    { name: 'Jane Smith', relation: 'Family', phone: '987-654-3210' },
  ]);

  const [editing, setEditing] = useState(false);
  const [newRow, setNewRow] = useState({ name: '', relation: '', phone: '' });

  const handleAddRow = () => {
    setData([...data, newRow]);
    setNewRow({ name: '', relation: '', phone: '' });
  };

  const handleRemoveRow = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsBlurred(!isBlurred); // Toggle the blur effect when the menu is opened/closed
  };
  const hamburger_class = isMenuOpen ? 'hamburger hamburger--spring is-active' : 'hamburger hamburger--spring';
  const blur_class = isBlurred ? 'blur' : ''

  return (
    <div className='navbar-container'>
            <nav className="navbar">
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
        <div className='contacts-container'>
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
            <th>Name</th>
            <th>Relation</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr className='table-row' key={index}>
              <td>{row.name}</td>
              <td>{row.relation}</td>
              <td>{row.phone}</td>
              {editing && (
                <td>
                  <button className='button' onClick={() => handleRemoveRow(index)}>Remove</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {editing ? (
        <>
        <div className={`${blur_class}`}>
          <input
            type="text"
            placeholder="Name"
            value={newRow.name}
            onChange={(e) => setNewRow({ ...newRow, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Relation"
            value={newRow.relation}
            onChange={(e) => setNewRow({ ...newRow, relation: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone"
            value={newRow.phone}
            onChange={(e) => setNewRow({ ...newRow, phone: e.target.value })}
          />
          <button className='button' onClick={handleAddRow}>Add Row</button>
          
        </div>
        <button className='button' onClick={() => setEditing(false)}>Save</button>
        </>
      ) : (
        <button className={`button ${blur_class}`} onClick={() => setEditing(true)}>Edit</button>
      )}
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

export default Contacts;
