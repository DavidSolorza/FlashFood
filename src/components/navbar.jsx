import React from 'react';
import '../styles/navbar.css';
import { FaHamburger } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <FaHamburger className="navbar-icon" />
        <span className="navbar-title">Flas Food</span>
      </div>
      <div className="navbar-right">
        {/* Puedes poner aquí botones de login, perfil, o notificaciones */}
        {/* <button className="navbar-btn">Login</button> */}
      </div>
    </nav>
  );
};

export default Navbar;
