import React, { useState } from 'react';  
import { Link } from 'react-router-dom';  
import '../styles/Header.css';  

const Header = () => {  
  const [isMenuOpen, setMenuOpen] = useState(false);  

  const toggleMenu = () => {  
    setMenuOpen(!isMenuOpen);  
  };  

  return (  
    <header className="header">  
      <div className="logo">Meal Planner</div>  
      <nav>  
        <div className="menu-toggle" onClick={toggleMenu}>  
          {isMenuOpen ? 'Close' : 'Menu'}  
        </div>  
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>  
          <li><Link to="/">Home</Link></li>  
          <li><Link to="/recipes">Recipes</Link></li>  
          <li><Link to="/planner">Planner</Link></li>  
          <li><Link to="/favorites">Favorites</Link></li>  
        </ul>  
      </nav>  
    </header>  
  );  
};  

export default Header;