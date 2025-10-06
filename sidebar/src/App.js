import './App.css';
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Charusat from './pages/Charusat';
import Depstar from './pages/Depstar';
import CSE from './pages/CSE';

function App() {
  const[isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const handleMenuClick = () => {
    setIsOpen(false);
  };
  return (
    <Router>
      <div className="app">
        <button onClick={toggleSidebar} className="toggle-button" style={{ display: isOpen ? 'none' : 'block' }}>☰</button>
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} onMenuClick={handleMenuClick}/>
        <div className="main-content">
          <Routes>
            <Route path="/charusat" element={<Charusat />} />
            <Route path="/depstar" element={<Depstar />} /> 
            <Route path="/cse" element={<CSE />} />
            <Route path="/" element={
              <div className="page home">
                <h1 style={{textAlign:'center'}}>CHARUSAT — A+ NAAC Accredited University</h1>
                <p>
                  CHARUSAT is a leading private university in Gujarat, known for academic excellence, industry collaborations, and innovation-driven education.
                </p>
                <h2>Quick Facts</h2>
                <ul>
                  <li>Established in 2009, Changa, Gujarat</li>
                  <li>9 institutes under 6 faculties</li>
                  <li>7,500+ students, 550+ faculty members</li>
                  <li>Ranked in NIRF Top 200</li>
                  <li>Accredited with NAAC A+</li>
                </ul>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
