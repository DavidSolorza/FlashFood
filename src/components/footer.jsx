import React from 'react';
import '../styles/footer.css';
import { FaHome, FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-icon">
        <FaHome />
        <span>Inicio</span>
      </div>
      
      <div className="footer-icon">
        <FaShoppingCart />
        <span>Carrito</span>
      </div>
      <div className="footer-icon">
        <FaUser />
        <span>Perfil</span>
      </div>
    </footer>
  );
};

export default Footer;
