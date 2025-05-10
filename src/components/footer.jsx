import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/footer.css';
import { FaHome, FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useGlobal } from '../contextoGlobal';

const Footer = () => {
  const location = useLocation();
  const { setBuscadorVisible } = useGlobal();

  // Solo activar la función en la ruta de productos
  const handleCarritoClick = () => {
    if (location.pathname === '/productos') {
      localStorage.setItem('sidebarAbierto', 'true');
      window.dispatchEvent(new Event('storage'));
    }
  };

  // Mostrar buscador solo en productos
  const handleBuscarClick = () => {
    if (location.pathname === '/productos') {
      setBuscadorVisible(true);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-icon">
        <FaHome />
        <span>Inicio</span>
      </div>
      <div className="footer-icon" onClick={handleBuscarClick} style={{ cursor: 'pointer' }}>
        <FaSearch />
        <span>Buscar</span>
      </div>
      <div className="footer-icon" onClick={handleCarritoClick} style={{ cursor: 'pointer' }}>
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
