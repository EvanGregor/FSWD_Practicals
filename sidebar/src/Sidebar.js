import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar, onMenuClick }) => {
  return (
    <>
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={toggleSidebar}>×</button>
        <h2>Menu</h2>
        <ul>
          <li><Link to="/" onClick={onMenuClick}>🏠 Home</Link></li>
          <li><Link to="/charusat" onClick={onMenuClick}>🎓 Welcome to Charusat</Link></li>
          <li><Link to="/depstar" onClick={onMenuClick}>🏫 Welcome to Depstar</Link></li>
          <li><Link to="/cse" onClick={onMenuClick}>💻 Welcome to CSE</Link></li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
