// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './styles/App.css';

import Login from './components/login';
import ProductosCrud from './components/productos/productosCrud';
import Navbar from './components/navbar';
import Footer from './components/footer';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div className="App">
      {!isLoginPage && <Navbar />}

      <div className="page-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/productos" element={<ProductosCrud />} />
          {/* Agrega más rutas aquí */}
        </Routes>
      </div>

      {!isLoginPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
